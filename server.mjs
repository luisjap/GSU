// Servidor del sitio GSU: sirve los archivos estáticos (con la misma
// configuración de serve.json) y recibe el formulario de contacto en
// POST /api/contacto, que se envía por correo a MAIL_TO (contacto@gsu.cl).
//
// Variables de entorno (Railway → Variables):
//   PORT              puerto (Railway lo define solo)
//   MAIL_TO           destino de las solicitudes (por defecto contacto@gsu.cl)
//   MAIL_FROM         remitente verificado, ej. "Sitio GSU <web@gsu.cl>"
//   Proveedor de correo, uno de los dos:
//     RESEND_API_KEY                       → envío por la API de Resend
//     SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS → envío por SMTP (requiere nodemailer)
// Sin proveedor configurado, el formulario responde con un error claro y
// el sitio invita a escribir por WhatsApp: nunca simula un envío exitoso.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "serve-handler";

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = { ...JSON.parse(fs.readFileSync(path.join(RAIZ, "serve.json"), "utf8")), public: RAIZ };
const PORT = Number(process.env.PORT || 8080);
const MAIL_TO = process.env.MAIL_TO || "contacto@gsu.cl";
const MAX_FOTOS = 3;
const MAX_FOTO = 5 * 1024 * 1024;
const MAX_CUERPO = 17 * 1024 * 1024;
const TIPOS_FOTO = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);
const PRIVADOS = [/\/\./, /^\/contenido\//, /^\/herramientas\//, /^\/node_modules\//, /^\/server\.mjs$/, /^\/package(-lock)?\.json$/, /^\/railway\.json$/, /^\/serve\.json$/, /\.md$/i];

const ESPECIALIDADES = {
  electricidad: "Electricidad", climatizacion: "Climatización", gasfiteria: "Gasfitería y redes sanitarias",
  impermeabilizacion: "Impermeabilización", soldadura: "Soldadura", electronica: "Electrónica",
  "cercos-electricos": "Cercos eléctricos", "camaras-de-seguridad": "Cámaras de seguridad y CCTV",
  "mantenimiento-integral": "Mantenimiento general", varias: "Varias especialidades / no está seguro",
};

// límite simple de envíos por IP: 5 cada 10 minutos
const envios = new Map();
function permitido(ip) {
  const ahora = Date.now();
  const lista = (envios.get(ip) || []).filter((t) => ahora - t < 10 * 60 * 1000);
  if (lista.length >= 5) return false;
  lista.push(ahora);
  envios.set(ip, lista);
  return true;
}

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const json = (res, codigo, datos) => {
  res.writeHead(codigo, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(datos));
};

async function enviarCorreo({ asunto, html, texto, replyTo, adjuntos }) {
  if (process.env.RESEND_API_KEY) {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.MAIL_FROM || "Sitio GSU <onboarding@resend.dev>",
        to: [MAIL_TO], reply_to: replyTo, subject: asunto, html, text: texto,
        attachments: adjuntos.map((a) => ({ filename: a.nombre, content: a.datos.toString("base64") })),
      }),
    });
    if (!r.ok) throw new Error(`Resend respondió ${r.status}: ${await r.text()}`);
    return;
  }
  if (process.env.SMTP_HOST) {
    const { default: nodemailer } = await import("nodemailer");
    const transporte = nodemailer.createTransport({
      host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporte.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER, to: MAIL_TO, replyTo, subject: asunto, html, text: texto,
      attachments: adjuntos.map((a) => ({ filename: a.nombre, content: a.datos, contentType: a.tipo })),
    });
    return;
  }
  const error = new Error("No hay proveedor de correo configurado (RESEND_API_KEY o SMTP_HOST).");
  error.sinProveedor = true;
  throw error;
}

async function contacto(req, res) {
  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
  if (Number(req.headers["content-length"] || 0) > MAX_CUERPO) return json(res, 413, { ok: false, error: "Los archivos superan el tamaño permitido." });
  if (!permitido(ip)) return json(res, 429, { ok: false, error: "Recibimos varias solicitudes seguidas. Espera unos minutos o escríbenos por WhatsApp." });

  let datos;
  try {
    datos = await new Request("http://local/api/contacto", { method: "POST", headers: req.headers, body: req, duplex: "half" }).formData();
  } catch {
    return json(res, 400, { ok: false, error: "No pudimos leer el formulario. Inténtalo de nuevo." });
  }
  const campo = (n, max = 200) => String(datos.get(n) || "").trim().slice(0, max);
  if (campo("sitio_web")) return json(res, 200, { ok: true }); // trampa anti-spam: se descarta en silencio

  const f = {
    nombre: campo("nombre", 120), empresa: campo("empresa", 120), email: campo("email", 160), telefono: campo("telefono", 30),
    comuna: campo("comuna", 120), servicio: campo("servicio", 40), mensaje: campo("mensaje", 4000), consentimiento: campo("consentimiento", 5),
  };
  const errores = {};
  if (!f.nombre) errores.nombre = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errores.email = true;
  if (!f.telefono) errores.telefono = true;
  if (!f.comuna) errores.comuna = true;
  if (!ESPECIALIDADES[f.servicio]) errores.servicio = true;
  if (!f.mensaje) errores.mensaje = true;
  if (f.consentimiento !== "si") errores.consentimiento = true;

  const fotos = datos.getAll("fotos").filter((x) => typeof x === "object" && x.size > 0);
  if (fotos.length > MAX_FOTOS || fotos.some((x) => x.size > MAX_FOTO || !TIPOS_FOTO.has(x.type))) errores.fotos = true;
  if (Object.keys(errores).length) return json(res, 422, { ok: false, campos: errores, error: "Revisa los campos marcados." });

  const adjuntos = await Promise.all(fotos.map(async (x, i) => ({ nombre: x.name || `foto-${i + 1}.jpg`, tipo: x.type, datos: Buffer.from(await x.arrayBuffer()) })));
  const especialidad = ESPECIALIDADES[f.servicio];
  const filas = [["Nombre", f.nombre], ["Empresa", f.empresa || "—"], ["Correo", f.email], ["Teléfono", f.telefono], ["Comuna o ubicación", f.comuna], ["Especialidad", especialidad], ["Fotos adjuntas", String(adjuntos.length)]];
  const html = `<h2>Nueva solicitud de cotización</h2><table cellpadding="6" style="border-collapse:collapse">${filas.map(([k, v]) => `<tr><td style="color:#555">${k}</td><td><strong>${esc(v)}</strong></td></tr>`).join("")}</table><h3>Necesidad</h3><p style="white-space:pre-wrap">${esc(f.mensaje)}</p><p style="color:#888;font-size:12px">Enviado desde el formulario de gsu.cl. Responde a este correo para escribirle al cliente.</p>`;
  const texto = `${filas.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nNecesidad:\n${f.mensaje}`;

  try {
    await enviarCorreo({ asunto: `Cotización · ${especialidad} · ${f.nombre}`, html, texto, replyTo: f.email, adjuntos });
    return json(res, 200, { ok: true });
  } catch (e) {
    console.error("[contacto] no se pudo enviar:", e.message);
    return json(res, e.sinProveedor ? 503 : 502, { ok: false, error: "No pudimos enviar tu solicitud en este momento." });
  }
}

http.createServer(async (req, res) => {
  const ruta = decodeURIComponent((req.url || "/").split("?")[0]);
  if (ruta === "/api/contacto") {
    if (req.method !== "POST") return json(res, 405, { ok: false, error: "Método no permitido." });
    return contacto(req, res);
  }
  if (PRIVADOS.some((r) => r.test(ruta))) {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    return res.end(fs.readFileSync(path.join(RAIZ, "404.html")));
  }
  return handler(req, res, CONFIG);
}).listen(PORT, () => console.log(`GSU en http://localhost:${PORT}`));
