// Genera las páginas HTML del sitio a partir de contenido/*.json.
//
//   npm run build            → versión de producción: los datos marcados como
//                              "pendiente" no se publican.
//   npm run build:revision   → muestra cada dato pendiente con una marca amarilla,
//                              para revisarlos antes de publicar.
//
// Siempre escribe PENDIENTES.md con la lista de datos que GSU debe completar.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REVISION = process.argv.includes("--revision");
const leer = (f) => JSON.parse(fs.readFileSync(path.join(RAIZ, "contenido", f), "utf8"));

const sitio = leer("sitio.json");
const paginas = leer("paginas.json");
const imagenes = leer("imagenes.json");
const legado = leer("legado/meta.json");
const servicios = sitio.servicios.map((slug) => leer(`servicios/${slug}.json`));
const S = Object.fromEntries(servicios.map((s) => [s.slug, s]));
const pendientes = [];
const generadas = [];

const hash = crypto.createHash("md5")
  .update(fs.readFileSync(path.join(RAIZ, "styles.css")))
  .update(fs.readFileSync(path.join(RAIZ, "site.js")))
  .digest("hex").slice(0, 8);

// ---------- utilidades ----------

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const wa = (texto) => `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(texto)}`;
const cotizar = (slug) => (slug ? `contacto.html?servicio=${slug}` : "contacto.html");

/** Registra un dato pendiente. Devuelve true si el elemento debe mostrarse. */
function visible(item, donde, que) {
  if (!item || !item.pendiente) return true;
  pendientes.push({ donde, que, nota: item.pendiente });
  return REVISION;
}
const marca = (item) => (REVISION && item && item.pendiente ? ` <mark class="pend">Pendiente: ${esc(item.pendiente)}</mark>` : "");

const ICONOS = {
  rayo: '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>',
  tablero: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h6M9 11h6M9 15h3"/>',
  lupa: '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  reloj: '<path d="M12 8v4l3 2"/><circle cx="12" cy="12" r="9"/>',
  escudo: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  aire: '<rect x="3" y="5" width="18" height="8" rx="2"/><path d="M7 17v2M12 17v3M17 17v2"/>',
  onda: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  gota: '<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>',
  llama: '<path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z"/>',
  llave: '<path d="M14.7 6.3a4 4 0 1 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2-2z"/>',
  techo: '<path d="M3 11 12 4l9 7M5 10v10h14V10"/>',
  soldar: '<path d="M3 21l6-6M13 7l4 4M9 13l6-6M15 5l1-1 4 4-1 1"/>',
  viga: '<path d="M4 6h16M4 18h16M12 6v12"/>',
  chip: '<rect x="6" y="6" width="12" height="12" rx="1"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>',
  control: '<path d="M4 6h16M4 12h10M4 18h6"/><circle cx="18" cy="15" r="3"/>',
  cerco: '<path d="M4 20V6M10 20V6M16 20V6M22 20V6M2 9h22M2 13h22"/>',
  campana: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21h4"/>',
  camara: '<path d="M3 7h12l4-3v14l-4-3H3z"/>',
  celular: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  grabador: '<rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 12h.01M11 12h6"/>',
  calendario: '<rect x="4" y="5" width="16" height="16" rx="1"/><path d="M8 3v4M16 3v4M4 10h16"/>',
  grilla: '<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>',
  documento: '<path d="M6 3h9l3 3v15H6z"/><path d="M9 12h6M9 16h4"/>',
  persona: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  corazon: '<path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/>',
  check: '<path d="M5 13l4 4L19 7"/>',
  ojo: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  chat: '<path d="M4 5h16v11H8l-4 4z"/>',
  flecha: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  telefono: '<path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2C9.5 20 4 14.5 4 7a2 2 0 0 1 1-3z"/>',
  correo: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  ubicacion: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  mas: '<path d="M12 5v14M5 12h14"/>',
};
const ICONO_SERVICIO = {
  electricidad: "rayo", climatizacion: "aire", gasfiteria: "gota", impermeabilizacion: "techo", soldadura: "soldar",
  electronica: "chip", "cercos-electricos": "cerco", "camaras-de-seguridad": "camara", "mantenimiento-integral": "calendario",
};
const ico = (n, extra = "") => `<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"${extra}>${ICONOS[n] || ICONOS.check}</svg>`;

// ---------- imágenes ----------

const IMG = Object.fromEntries(imagenes.imagenes.map((i) => [i.id, i]));
const existe = (rel) => fs.existsSync(path.join(RAIZ, rel));
/** Devuelve { src, srcset, alt } de una imagen del listado, o null si no hay archivo. */
function imagen(id) {
  const i = IMG[id];
  if (!i) throw new Error(`Imagen desconocida: ${id}`);
  if (existe(`images/ia/${id}-1600.webp`)) {
    // la versión cambia cada vez que se regenera la imagen, para que el navegador no muestre la anterior
    const v = Math.round(fs.statSync(path.join(RAIZ, `images/ia/${id}-1600.webp`)).mtimeMs / 1000).toString(36);
    return { src: `images/ia/${id}-960.webp?v=${v}`, srcset: [480, 960, 1600].map((w) => `images/ia/${id}-${w}.webp?v=${v} ${w}w`).join(", "), alt: i.alt };
  }
  pendientes.push({ donde: "Imágenes", que: id, nota: "Imagen aún no generada; se usa una de respaldo o un fondo de color." });
  if (i.respaldo) {
    const rel = existe(`images/${i.respaldo}`) ? `images/${i.respaldo}` : i.respaldo;
    return { src: rel, srcset: "", alt: i.alt };
  }
  return null;
}
function imgTag(id, { cls = "fill", sizes = "(max-width: 700px) 100vw, 50vw", eager = false } = {}) {
  const i = imagen(id);
  if (!i) return "";
  return `<img class="${cls}" src="${i.src}"${i.srcset ? ` srcset="${i.srcset}" sizes="${sizes}"` : ""} alt="${esc(i.alt)}"${eager ? ' fetchpriority="high"' : ' loading="lazy"'} decoding="async">`;
}
const bgUrl = (id) => imagen(id)?.src || "";

/** Video decorativo (contenido/videos.json): se reproduce solo cuando está en pantalla y nunca con "reducir movimiento". */
function videoTag(id, cls) {
  const base = `images/ia/${id}`;
  if (!existe(`${base}.mp4`) || !existe(`${base}-poster-960.webp`)) {
    pendientes.push({ donde: "Videos", que: id, nota: "Video aún no generado (python3 herramientas/generar_video.py)." });
    return "";
  }
  const v = (f) => Math.round(fs.statSync(path.join(RAIZ, f)).mtimeMs / 1000).toString(36);
  return `<div class="${cls}"><video class="fill" muted loop playsinline preload="none" aria-hidden="true" data-auto poster="${base}-poster-960.webp?v=${v(`${base}-poster-960.webp`)}">${existe(`${base}.webm`) ? `<source src="${base}.webm?v=${v(`${base}.webm`)}" type="video/webm">` : ""}<source src="${base}.mp4?v=${v(`${base}.mp4`)}" type="video/mp4"></video></div>`;
}

// ---------- componentes ----------

function banner(s, { rev = false, hero = false, cap = "" } = {}) {
  const id = s.banner.imagen;
  const img = imagen(id);
  const bloque = s.banner.bloque || s.color;
  const textoBloque = s.banner.bloque ? s.color : s.colorTexto;
  const mlen = Math.max(...s.banner.silabas.map((x) => x.length));
  const palabra = s.banner.silabas.map(esc).join("<br>");
  const foto = img
    ? `<div class="banner__photo">${imgTag(id, { eager: hero })}${cap}</div>`
    : `<div class="banner__photo sin-foto"><span class="ph-ico">${ico(ICONO_SERVICIO[s.slug])}</span>${cap}</div>`;
  // las letras gigantes pueden llevar una imagen propia (banner.imagenLetras), distinta de la foto
  const letras = (s.banner.imagenLetras && imagen(s.banner.imagenLetras)) || img;
  const word = letras
    ? `<div class="banner__word" aria-hidden="true" style="--mlen:${mlen};--stroke:${textoBloque}" data-bg="${letras.src}">${palabra}</div>`
    : `<div class="banner__word sin-foto" aria-hidden="true" style="--mlen:${mlen};--word:${textoBloque}">${palabra}</div>`;
  return `<div class="banner${rev ? " rev" : ""}${hero ? " banner--hero" : ""}" style="--blk:${bloque};--hl:${s.claro}">${foto}<div class="banner__big">${word}</div></div>`;
}
const fraseBanner = (s) => `${esc(s.banner.frase[0])}<br><span>${esc(s.banner.frase[1])}</span><br>${esc(s.banner.frase[2])}`;
const capInicio = (s) => `<div class="cap"><p class="eyebrow-m" style="color:${s.claro}">${esc(s.division)}</p><h3>${fraseBanner(s)}</h3></div>`;

function botonesServicio(s, { claro = false } = {}) {
  return `<div class="acts" style="display:flex;gap:10px;flex-wrap:wrap;margin-top:18px"><a class="rbtn" href="${cotizar(s.slug)}" style="background:${s.boton};color:${s.botonTexto}">Solicitar cotización</a><a class="rbtn" href="${s.slug}.html" style="border-color:${claro ? "rgba(255,255,255,.45)" : "#C5CFDA"};color:${claro ? "#fff" : "#0A2342"}">Ver servicio</a></div>`;
}

const flechas = (color = "currentColor") => `<div class="arrows" style="color:${color}"><button type="button" data-dir="-1" aria-label="Anterior">←</button><button type="button" data-dir="1" aria-label="Siguiente">→</button></div>`;

function faqLista(items, idBase) {
  return `<div class="faq-list">${items.map((f, i) => `
      <div class="faq-item">
        <button class="faq-item__q" type="button" aria-expanded="false" aria-controls="${idBase}-${i}"><span>${esc(f.pregunta)}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg></button>
        <div class="faq-item__a" id="${idBase}-${i}"><p>${f.respuesta ? esc(f.respuesta) : ""}${marca(f)}</p></div>
      </div>`).join("")}
    </div>`;
}
const faqLd = (items) => items.filter((f) => f.respuesta && !f.pendiente).length
  ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.filter((f) => f.respuesta && !f.pendiente).map((f) => ({ "@type": "Question", name: f.pregunta, acceptedAnswer: { "@type": "Answer", text: f.respuesta } })) }
  : null;

function procesoTimeline({ titulo = "De la solicitud a la entrega, en cinco etapas.", enlace = true } = {}) {
  return `<section class="how anim" id="como-trabajamos">
        <div class="wrap">
          <div class="shead"><div><p class="eyebrow-m" style="color:#7FB2F0">Cómo trabajamos</p><h3>${esc(titulo)}</h3></div>${enlace ? '<a class="rbtn" href="como-trabajamos.html" style="border-color:rgba(255,255,255,.4);color:#fff">Ver el proceso completo →</a>' : ""}</div>
          <ol class="tl">${paginas.proceso.map((p, i) => `<li><span class="n">${i + 1}</span><b>${esc(p.titulo)}</b><p>${esc(p.texto)}</p></li>`).join("")}</ol>
        </div>
      </section>`;
}

function ctaBanda(titulo, texto, slug) {
  return `<section class="cta-band">
      <h2 class="cta-band__title">${esc(titulo)}</h2>
      <p class="cta-band__deck">${esc(texto)}</p>
      <div class="cta-band__actions">
        <a class="btn btn--primary" href="${cotizar(slug)}">Solicitar cotización</a>
        <a class="btn btn--ghost" href="${wa(slug ? `Hola, quiero una cotización de ${S[slug].nombreCorto}.` : "Hola, quiero información sobre los servicios de GSU.")}" target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </section>`;
}

function heroSimple({ titulo, deck = "", eyebrow = "", imagenId = "inicio-hero", migas = [] }) {
  const img = imagenId ? imagen(imagenId) : null;
  return `<section class="page-hero">
      ${img ? `<img class="page-hero__media" src="${img.src}"${img.srcset ? ` srcset="${img.srcset}" sizes="100vw"` : ""} alt="" fetchpriority="high">` : '<div class="page-hero__media" style="background:linear-gradient(135deg,var(--carbon),var(--carbon-soft))"></div>'}
      <div class="page-hero__scrim"></div>
      <div class="page-hero__content">
        ${migas.length ? `<p class="crumbs micro"><a href="index.html">Inicio</a>${migas.map((m) => `<span>/</span>${m.url ? `<a href="${m.url}">${esc(m.texto)}</a>` : `<span>${esc(m.texto)}</span>`}`).join("")}</p>` : ""}
        ${eyebrow ? `<p class="page-hero__eyebrow micro">${esc(eyebrow)}</p>` : ""}
        <h1 class="page-hero__title">${esc(titulo)}</h1>
        ${deck ? `<p class="page-hero__deck">${esc(deck)}</p>` : ""}
      </div>
    </section>`;
}

// ---------- plantilla general ----------

function encabezado(actual) {
  const items = sitio.menu.map((m) => {
    const cur = m.url === actual ? ' aria-current="page"' : "";
    if (!m.desplegable) return `<a href="${m.url}"${cur}>${esc(m.texto)}</a>`;
    const esServ = servicios.some((s) => `${s.slug}.html` === actual) || actual === m.url;
    return `<div class="has-dropdown">
        <a href="${m.url}"${esServ ? ' aria-current="page"' : ""}>${esc(m.texto)}</a>
        <div class="nav-dropdown">
${servicios.map((s) => `          <a href="${s.slug}.html"><span class="dot" style="--c:${s.color}"></span>${esc(s.nombre)}</a>`).join("\n")}
          <div class="nav-dropdown__foot"><a href="servicios.html">Ver todos los servicios →</a></div>
        </div>
      </div>`;
  }).join("\n      ");
  return `<header class="site-header">
    <a class="site-header__brand" href="index.html"><img class="site-header__logo" src="logo-white.webp" alt="GSU Ingeniería y Mantenimiento" width="100" height="28"></a>
    <nav class="site-header__nav" aria-label="Navegación principal">
      ${items}
    </nav>
    <a class="site-header__cta" href="contacto.html">Solicitar cotización</a>
    <button class="site-header__toggle" type="button" aria-label="Abrir menú" aria-expanded="false">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
  </header>`;
}

function pie() {
  const lista = (arr) => arr.map((l) => `<li><a href="${l.url}">${esc(l.texto)}</a></li>`).join("");
  const horario = visible(sitio.horario, "Pie de página", "Horario de atención") ? `<li>Horario: ${marca(sitio.horario)}</li>` : "";
  return `<footer class="site-footer">
    <div class="site-footer__col">
      <a class="site-footer__brand" href="index.html"><img class="site-footer__logo" src="logo-white.webp" alt="GSU" width="86" height="24"></a>
      <p class="site-footer__lead">${esc(sitio.nombre)}. Soluciones integrales para instalaciones, infraestructura y mantenimiento en la ${esc(sitio.cobertura)}.</p>
    </div>
    <div class="site-footer__col"><h3>Servicios</h3><ul>${servicios.map((s) => `<li><a href="${s.slug}.html">${esc(s.nombreCorto)}</a></li>`).join("")}</ul></div>
    <div class="site-footer__col"><h3>Empresa</h3><ul>${lista(sitio.piePagina.empresa)}</ul></div>
    <div class="site-footer__col"><h3>Políticas</h3><ul>${lista(sitio.piePagina.politicas)}</ul></div>
    <div class="site-footer__col"><h3>Contacto</h3><ul>
      <li><a href="tel:${sitio.telefonoLink}">${esc(sitio.telefono)}</a></li>
      <li><a href="mailto:${sitio.correo}">${esc(sitio.correo)}</a></li>
      <li><a href="${wa("Hola, quiero información sobre los servicios de GSU.")}" target="_blank" rel="noopener">WhatsApp</a></li>
      <li>${esc(sitio.cobertura)}</li>${horario}
    </ul></div>
    <div class="site-footer__bottom">
      <span>© <span data-year>${new Date().getFullYear()}</span> ${esc(sitio.nombre)}.</span>
      <span>Las imágenes de los servicios son ilustrativas.</span>
      <a href="#top">Volver arriba ↑</a>
    </div>
  </footer>`;
}

function documento({ ruta, titulo, descripcion, cuerpo, actual = ruta, ld = [], imagenOg = "inicio-hero", noindex = false, preload = "" }) {
  const canonical = ruta === "index.html" ? `${sitio.dominio}/` : `${sitio.dominio}/${ruta}`;
  const og = imagen(imagenOg);
  const lds = ld.filter(Boolean).map((o) => `<script type="application/ld+json">${JSON.stringify(o)}</script>`).join("\n  ");
  const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#0A2342">
  <title>${esc(titulo)}</title>
  <meta name="description" content="${esc(descripcion)}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">`}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${esc(sitio.nombre)}">
  <meta property="og:locale" content="es_CL">
  <meta property="og:title" content="${esc(titulo)}">
  <meta property="og:description" content="${esc(descripcion)}">
  <meta property="og:url" content="${canonical}">
  ${og ? `<meta property="og:image" content="${sitio.dominio}/${og.src}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="favicons/favicon-32.png" sizes="32x32" type="image/png">
  <link rel="icon" href="favicons/favicon-16.png" sizes="16x16" type="image/png">
  <link rel="icon" href="favicons/icon-192.png" sizes="192x192" type="image/png">
  <link rel="apple-touch-icon" href="favicons/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500..900&family=Inter:wght@400..700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css?v=${hash}">
  ${preload}
  ${lds}
</head>
<body id="top">
  <a class="sr-only" href="#contenido">Saltar al contenido</a>
  ${encabezado(actual)}

  <main id="contenido" class="r26">
${cuerpo}
  </main>

  ${pie()}

  <a class="whatsapp-fab is-visible" href="${wa("Hola, quiero información sobre los servicios de GSU.")}" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp">
    <svg class="whatsapp-fab__icon" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.697 4.61 1.897 6.481L4 29l7.72-1.865A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15S22.629 3 16.001 3Zm6.845 17.09c-.29.815-1.437 1.494-2.353 1.688-.63.13-1.452.234-4.22-.906-3.542-1.464-5.823-5.06-6.001-5.297-.171-.237-1.44-1.916-1.44-3.655 0-1.74.912-2.594 1.235-2.95.323-.356.706-.445.941-.445.235 0 .47.002.677.012.216.01.507-.082.793.605.29.7.986 2.415 1.072 2.591.086.176.144.382.029.618-.115.235-.172.382-.343.588-.171.206-.36.46-.514.618-.171.176-.35.367-.15.72.2.353.888 1.464 1.907 2.371 1.31 1.168 2.415 1.53 2.768 1.7.353.171.559.147.765-.088.206-.235.882-1.03 1.117-1.383.235-.353.47-.294.793-.176.323.117 2.038.96 2.388 1.135.35.176.583.264.67.412.088.147.088.853-.202 1.667Z"/></svg>
  </a>

  <script src="site.js?v=${hash}" defer></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(RAIZ, ruta), html);
  if (!noindex) generadas.push(ruta);
}

// ---------- inicio ----------

function seccionServicio(s) {
  const caps = s.capacidades.filter((c) => visible(c, `Inicio · ${s.nombreCorto}`, c.titulo));
  const base = `class="svc-sec ${{ electricidad: "elec", climatizacion: "clima", gasfiteria: "gas", impermeabilizacion: "imper", soldadura: "sold", electronica: "tron", "cercos-electricos": "cerco", "camaras-de-seguridad": "cam", "mantenimiento-integral": "care" }[s.slug]} has-banner anim" id="${s.slug}" data-c="${s.color}" data-ct="${s.colorTexto}"`;
  switch (s.slug) {
    case "electricidad":
      return `<section ${base}>
        ${banner(s, { cap: capInicio(s) })}
        <div class="elec__band wrap">
          <span class="ghost" aria-hidden="true">Capacidades</span>
          <div class="shead"><div><p class="eyebrow-m" style="color:#FFC72C">Capacidades</p><h3>Energía continua para tu instalación.</h3></div>${botonesServicio(s, { claro: true })}</div>
          <div class="ecards">${caps.map((c) => `<a class="ec" href="${s.slug}.html"><div class="ec__img">${c.imagen ? imgTag(c.imagen, { sizes: "(max-width:560px) 78vw, (max-width:900px) 45vw, 25vw" }) : ""}<span class="ec__ic">${ico(c.icono, c.icono === "rayo" ? ' data-bolt=""' : "")}</span></div><div class="ec__b"><span class="ec__tag">${esc(s.division)}</span><b>${esc(c.titulo)}</b><p>${esc(c.texto)}${marca(c)}</p><span class="ec__more">Ver más ${ico("flecha")}</span></div></a>`).join("")}</div>
        </div>
      </section>`;
    case "climatizacion": {
      const ids = ["clima-instalacion", "clima-mantencion", "clima-diagnostico", "clima-optimizacion"];
      return `<section ${base}>
        ${banner(s, { rev: true, cap: capInicio(s) })}
        <div class="clima__zona">
          <svg class="airflow" viewBox="0 0 1200 400" preserveAspectRatio="none" aria-hidden="true">${[60, 140, 230, 320].map((y, i) => `<path style="--d:${i * -2.5}s" d="M-50 ${y} C150 ${y - 40} 350 ${y + 40} 550 ${y} S950 ${y - 40} 1250 ${y}"/>`).join("")}</svg>
          <div class="wrap clima__grid">
            <div class="clima__intro">
              <p class="eyebrow-m" style="color:#0B6E9C">${esc(s.division)}</p>
              <h3>Climatización y ventilación para cada espacio.</h3>
              <p class="clima__deck">${esc(s.deck)}</p>
              <div class="thermo" aria-hidden="true">
                <svg viewBox="0 0 120 120"><circle class="track-r" cx="60" cy="60" r="50"/><circle class="arc" cx="60" cy="60" r="50"/></svg>
                <div class="thermo__v"><b data-count="22">22</b><span>°C</span></div>
                <div class="thermo__t">${ico("aire")}<span>Confort estable</span></div>
              </div>
              ${botonesServicio(s)}
            </div>
            <div class="acc" role="list">${caps.slice(0, 4).map((c, i) => `
              <a class="acc__p${i === 0 ? " is-open" : ""}" href="${s.slug}.html" role="listitem">
                ${imgTag(ids[i], { sizes: "(max-width:760px) 100vw, 40vw" })}
                <span class="acc__ic">${ico(c.icono)}</span>
                <span class="acc__v" aria-hidden="true">${esc(c.titulo)}</span>
                <span class="acc__b"><b>${esc(c.titulo)}</b><span class="acc__t">${esc(c.texto)}</span><span class="acc__more">Ver más ${ico("flecha")}</span></span>
              </a>`).join("")}
            </div>
          </div>
        </div>
      </section>`;
    }
    case "gasfiteria": {
      return `<section ${base}>
        ${banner(s, { cap: capInicio(s) })}
        <div class="gas__zona">
          <div class="wrap gas__top">
            <div class="gas__txt">
              <p class="eyebrow-m" style="color:#0A7A6C">${esc(s.division)}</p>
              <h3>${esc(s.titulo)}.</h3>
              <p class="gas__deck">${esc(s.presentacion)}</p>
              <div class="gas__chips"><span>${ico("gota")}Agua potable y alcantarillado</span><span>${ico("llama")}Gas y artefactos</span></div>
              ${botonesServicio(s)}
            </div>
            <div class="gas__col">
              <div class="gas__big">${imgTag("gas-detalle", { sizes: "(max-width:760px) 100vw, 40vw" })}</div>
              <div class="gas__small">${imgTag("gas-hermeticidad", { sizes: "(max-width:760px) 50vw, 20vw" })}</div>
              <div class="gas__tag">${ico("gota")}<div><b>Agua y gas</b><span>un mismo equipo</span></div></div>
            </div>
          </div>
          <svg class="wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 C200 0 400 60 600 30 S1000 0 1200 30 V60 H0Z" fill="#E6F5F3"/></svg>
          <div class="gas__band">
            <div class="wrap">
              <div class="gas__head"><p class="eyebrow-m" style="color:#0A7A6C">La red completa</p><h3>Del medidor a cada artefacto.</h3></div>
              <div class="red">
                <div class="red__tubo" aria-hidden="true"><span class="red__flujo"></span></div>
                ${caps.slice(0, 4).map((c, i) => `<a class="nodo" href="${s.slug}.html" style="--i:${i}">
                  <span class="nodo__v">${ico(c.icono)}</span>
                  <span class="nodo__c"><b>${esc(c.titulo)}</b><span>${esc(c.texto)}</span><span class="nodo__more">Ver más ${ico("flecha")}</span></span>
                </a>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </section>`;
    }
    case "impermeabilizacion": {
      // de abajo hacia arriba: losa, sellado, membrana, protección (cada capa corresponde a una capacidad)
      const porTitulo = (inicio) => caps.find((c) => c.titulo.startsWith(inicio));
      const capas = [
        ["Losa y estructura", porTitulo("Diagnóstico"), "Medimos la humedad y ubicamos dónde entra el agua."],
        ["Sellado de puntos críticos", porTitulo("Tratamiento"), null],
        ["Membrana impermeable", porTitulo("Impermeabilización"), null],
        ["Capa de protección", porTitulo("Protección"), null],
      ].filter(([, c]) => c);
      const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      return `<section ${base}>
        ${banner(s, { rev: true, cap: capInicio(s) })}
        <div class="imp__zona">
          <div class="wrap imp__grid">
            ${videoTag("impermeabilizacion-capas", "capas-video")}
            <div class="imp__txt">
              <p class="eyebrow-m" style="color:#A7D69B">${esc(s.division)}</p>
              <h3>Un sistema por capas, no un parche.</h3>
              <p class="imp__deck">${esc(s.presentacion)}</p>
              <ol class="imp__lista">${capas.slice().reverse().map(([nombre, c]) => {
                const n = capas.findIndex((x) => x[1] === c) + 1;
                return `<li><a href="${s.slug}.html" data-capa="${n}"><span class="imp__ic">${ico(c.icono)}</span><span><small>${esc(nombre)}</small><b>${esc(c.titulo)}</b><span>${esc(c.texto)}</span></span></a></li>`;
              }).join("")}</ol>
              ${botonesServicio({ ...s, boton: "#A7D69B", botonTexto: "#0A2342" }, { claro: true })}
            </div>
          </div>
          <div class="wrap">
            <div class="temporada">
              <div class="temporada__txt"><b>Antes de la lluvia, no después.</b><span>En Santiago las lluvias se concentran entre mayo y agosto. Revisar la cubierta en otoño permite intervenir a tiempo.</span></div>
              <div class="meses" role="img" aria-label="Inspección recomendada de marzo a abril; lluvias de mayo a agosto">${meses.map((m, i) => `<span class="${i === 2 || i === 3 ? "insp" : i >= 4 && i <= 7 ? "lluvia" : ""}">${m}</span>`).join("")}</div>
              <div class="temporada__ley"><span><i class="insp"></i>Inspección recomendada</span><span><i class="lluvia"></i>Temporada de lluvias</span></div>
              <a class="rbtn" href="${cotizar(s.slug)}" style="background:#A7D69B;color:#0A2342">Agendar inspección →</a>
            </div>
          </div>
        </div>
      </section>`;
    }
    case "soldadura":
      return `<section ${base}>
        ${banner(s, { cap: capInicio(s) })}
        <div class="wrap">
          <div class="sold__grid">
            <div class="sold__hl"><span class="arr">${ico("flecha")}</span><span class="bar" style="background:#fff"></span><span><b>Soldar</b> es</span><span>crear uniones</span><span>que sostienen</span><span>la operación.</span>${botonesServicio({ ...s, boton: "#0A2342", botonTexto: "#fff" })}</div>
            <div class="sold__photo" data-sparks>${imgTag("soldadura-taller")}
              <div class="badge" aria-hidden="true"><svg class="ring" viewBox="0 0 110 110"><defs><path id="circ" d="M55 55 m-42 0 a42 42 0 1 1 84 0 a42 42 0 1 1 -84 0"/></defs><text><textPath href="#circ">ESTRUCTURAS · REJAS · REPARACIONES ·</textPath></text></svg>${ico("soldar", ' style="color:#F26A21;width:26px;height:26px"')}</div>
            </div>
          </div>
          <div class="sold__chips">${caps.map((c) => `<span>${esc(c.titulo)}</span>`).join("")}</div>
        </div>
      </section>`;
    case "electronica":
      return `<section ${base}>
        <svg class="tron__pcb" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true"><path d="M0 80 H300 L340 120 H700 L740 80 H1200"/><path d="M0 260 H180 L220 300 H520 L560 340 H900 L940 300 H1200"/><path d="M0 430 H420 L460 400 H820 L860 440 H1200"/><path d="M600 0 V60 L640 100 V200"/><path d="M1000 500 V380 L960 340 V260"/></svg>
        ${banner(s, { rev: true, cap: capInicio(s) })}
        <div class="wrap">
          <div class="shead"><div><p class="eyebrow-m" style="color:#C4B5FD">${esc(s.division)}</p><h3>Diagnóstico a nivel de componente.</h3>${botonesServicio(s, { claro: true })}</div><p style="color:#B8B2D6">${esc(s.deck)}</p></div>
          <div class="bento">
            <div class="bcard bcard--big"><div class="ph">${imgTag("electronica-placa")}</div><div class="tx"><span class="mono">capacidad principal</span><b>${esc(caps[0].titulo)}</b><p>${esc(caps[0].texto)}</p></div></div>
            ${caps.slice(1).map((c, i) => `<div class="bcard${i === 2 ? " wide" : ""}"><span class="ic">${ico(c.icono)}</span><b>${esc(c.titulo)}</b><p>${esc(c.texto)}</p></div>`).join("")}
          </div>
        </div>
      </section>`;
    case "cercos-electricos":
      return `<section ${base}>
        ${banner(s, { cap: capInicio(s) })}
        <div class="wrap">
          <div class="shead"><div><p class="eyebrow-m" style="color:#5F6B0F">Seguridad perimetral</p><h3>Cercos eléctricos y<br>seguridad perimetral.</h3></div></div>
          <div class="fence" aria-hidden="true">
            ${[4, 28, 52, 76, 97].map((l) => `<span class="post" style="left:${l}%"></span>`).join("")}
            ${[26, 44, 62, 80].map((t, i) => `<span class="w" style="top:${t}px"><span class="run" style="--d:${i * 0.5}s"></span></span>`).join("")}
            <div class="zones"><span><i></i>ZONA 1 · ACCESO</span><span><i></i>ZONA 2 · PATIO</span><span><i></i>ZONA 3 · BODEGA</span><span><i></i>ZONA 4 · FONDO</span></div>
          </div>
          <div class="fcards">${caps.map((c) => `<div class="fcard"><span class="ic">${ico(c.icono)}</span><b>${esc(c.titulo)}</b><p>${esc(c.texto)}</p></div>`).join("")}</div>
          <div class="combo"><div style="display:flex;gap:14px;align-items:center"><span class="dots2"><i style="background:#C2D62E"></i><i style="background:#E5383B"></i></span><div><b>Cerco eléctrico + cámaras, en un solo proyecto</b><p>Un levantamiento, una cotización y un solo equipo para todo el perímetro.</p></div></div><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="rbtn" href="${cotizar(s.slug)}" style="background:#C2D62E;color:#0A2342">Solicitar cotización →</a><a class="rbtn" href="${s.slug}.html" style="border-color:rgba(255,255,255,.4);color:#fff">Ver servicio</a></div></div>
        </div>
      </section>`;
    case "camaras-de-seguridad": {
      const feeds = [["camara-acceso", "CAM 01 · ACCESO"], ["camara-estacionamiento", "CAM 02 · ESTACIONAMIENTO"], ["camara-recepcion", "CAM 03 · RECEPCIÓN"], ["camara-bodega", "CAM 04 · BODEGA"]];
      return `<section ${base}>
        ${banner(s, { rev: true, cap: capInicio(s) })}
        <div class="wrap">
          <div class="shead"><div><p class="eyebrow-m" style="color:#FF8A8C">Videovigilancia</p><h3>${esc(s.titulo)}.</h3></div><p style="color:#AEB8C6">Montaje, cableado, configuración de grabadores y visualización remota, según los equipos y el alcance contratado.</p></div>
          <div class="cam__grid">
            <div class="feeds" aria-hidden="true">${feeds.map(([id, l], i) => `<div class="feed">${imgTag(id, { sizes: "(max-width:700px) 50vw, 25vw" })}${i === 0 ? '<span class="ts" data-clock></span>' : ""}<span class="rec"><i></i>REC</span><span class="lbl">${l}</span></div>`).join("")}</div>
            <div>
              <div class="camlist">${caps.map((c) => `<div><span class="sq">${ico(c.icono)}</span><div><b>${esc(c.titulo)}</b><p>${esc(c.texto)}</p></div></div>`).join("")}</div>
              ${botonesServicio(s, { claro: true })}
            </div>
          </div>
        </div>
      </section>`;
    }
    case "mantenimiento-integral":
      return `<section ${base}>
        ${banner(s, { cap: capInicio(s) })}
        <div class="wrap">
          <div class="care__grid">
            <div>
              <p class="eyebrow-m" style="color:#0057B8">${esc(s.division)} · Mantención integral</p>
              <h3 style="font-size:clamp(24px,3.4cqi,36px);font-weight:800;margin-top:8px">Un equipo, en vez de varios proveedores.</h3>
              <div class="care__list">${[caps[0], caps[1], caps[3]].filter(Boolean).map((c) => `<div><span class="sq">${ico(c.icono)}</span><div><b>${esc(c.titulo)}</b><p>${esc(c.texto)}</p></div></div>`).join("")}</div>
              ${botonesServicio(s)}
            </div>
            <div class="care__collage"><div class="a">${imgTag("mantenimiento-equipo", { sizes: "(max-width:700px) 60vw, 30vw" })}</div><div>${imgTag("mantenimiento-detalle", { sizes: "(max-width:700px) 40vw, 20vw" })}</div><div class="st"><div><b>Un solo plan</b>para todos los<br>servicios</div></div></div>
          </div>
          <div class="plans">
            <div class="plan"><span class="eyebrow-m">Servicio puntual</span><b>Una intervención</b><ul><li>Diagnóstico y cotización</li><li>Ejecución y revisión</li></ul></div>
            <div class="plan hi"><span class="eyebrow-m">Recomendado</span><b>Plan preventivo</b><ul><li>Visitas programadas</li><li>Uno o varios servicios</li><li>Informe por visita</li></ul></div>
            <div class="plan"><span class="eyebrow-m">Empresas</span><b>Contrato de mantención</b><ul><li>Toda la instalación</li><li>Un solo interlocutor</li></ul></div>
          </div>
        </div>
      </section>`;
  }
}

function construirInicio() {
  const faq = paginas.faq.filter((f) => f.inicio && visible(f, "Inicio · Preguntas frecuentes", f.pregunta));
  const aspectos = paginas.garantias.aspectos.filter((a) => visible(a, "Inicio · Garantías", a.titulo));
  const proyectos = paginas.proyectos;
  const heroImg = imagen("inicio-hero");
  const cuerpo = `
    <section class="hero">
      ${heroImg ? `<img class="hero__img" src="${heroImg.src}"${heroImg.srcset ? ` srcset="${heroImg.srcset}" sizes="100vw"` : ""} alt="" fetchpriority="high" decoding="async">` : ""}
      <div class="hero__in wrap">
        <div>
          <p class="eyebrow-m" style="color:#7FB2F0">${esc(sitio.lema)}</p>
          <h1>Ingeniería y Mantenimiento</h1>
          <p class="d">Soluciones integrales para instalaciones, infraestructura y mantenimiento. En GSU trabajamos para responder a las necesidades técnicas de nuestros clientes mediante servicios orientados a la seguridad, funcionalidad y conservación de sus espacios.</p>
          <div class="acts"><a class="rbtn" href="contacto.html" style="background:#fff;color:#0A2342">Solicitar cotización</a><a class="rbtn" href="#servicios" style="border-color:rgba(255,255,255,.5);color:#fff">Conocer nuestros servicios ↓</a></div>
        </div>
        <form class="qq" action="contacto.html" method="get">
          <b>Cotización rápida</b>
          <label for="qq-servicio">Especialidad</label>
          <select id="qq-servicio" name="servicio">${servicios.map((s) => `<option value="${s.slug}">${esc(s.nombreCorto)}</option>`).join("")}<option value="varias">Varias especialidades</option></select>
          <label for="qq-comuna">Comuna</label>
          <input id="qq-comuna" name="comuna" autocomplete="address-level2" placeholder="Ej. Providencia">
          <button class="rbtn" type="submit">Continuar →</button>
        </form>
      </div>
      <nav class="index wrap" id="servicios" aria-label="Servicios">
        ${servicios.map((s) => `<a href="#${s.slug}" style="--c:${s.color}"><i></i>${esc(s.nombreCorto)}</a>`).join("\n        ")}
      </nav>
    </section>

    <nav class="snav" aria-label="Ir a un servicio">
      <div class="snav__track">
        ${/* 6 copias: la mitad de la cinta (3 copias) siempre es más ancha que la pantalla, así el giro no deja huecos */
        Array.from({ length: 6 }, (_, k) => `<div class="snav__set"${k ? ' aria-hidden="true"' : ""}>${servicios.map((s) => `<a href="#${s.slug}"${k ? ' tabindex="-1"' : ""} style="--c:${s.color};--ct:${s.colorTexto}"><i></i>${esc(s.nombreCorto)}</a>`).join("")}</div>`).join("")}
      </div>
      <span class="prog"></span>
    </nav>

    ${servicios.map(seccionServicio).join("\n\n    ")}

    <section class="why">
      <div class="wrap">
        <div class="shead"><div><p class="eyebrow-m">¿Por qué elegir GSU?</p><h3>Un solo equipo técnico,<br>con reglas claras.</h3></div><p style="color:#4B4F54">Lo que puedes esperar en cada servicio, desde la primera consulta hasta la entrega.</p></div>
        <div class="why__grid">${paginas.porQue.map((p) => `<div class="why__c"><span class="ic">${ico(p.icono)}</span><b>${esc(p.titulo)}</b><p>${esc(p.texto)}</p></div>`).join("")}</div>
      </div>
    </section>

    ${procesoTimeline()}

    ${proyectos.length ? `<section class="proj"><div class="wrap"><div class="shead"><div><p class="eyebrow-m">Proyectos</p><h3>Trabajos realizados.</h3></div><a class="rbtn" href="proyectos.html" style="border-color:#C5CFDA;color:#0A2342">Ver proyectos</a></div></div></section>` : ""}

    <section class="about">
      <div class="wrap about__g">
        <div>
          <p class="eyebrow-m">Sobre GSU</p>
          <h3 style="font-size:clamp(24px,3.4cqi,36px);font-weight:800;margin-top:8px">Ingeniería, instalaciones y mantenimiento para espacios residenciales, comerciales y empresariales.</h3>
          <p class="l">${esc(paginas.nosotros.quienes[2])}</p>
          <a class="rbtn" href="nosotros.html" style="background:#0A2342;color:#fff">Conocer GSU →</a>
        </div>
        <div class="mv">
          <div><b>Misión</b><p>Entregar soluciones integrales que contribuyan a la seguridad, funcionalidad y conservación de las instalaciones de nuestros clientes.</p></div>
          <div><b>Visión</b><p>Ser una empresa reconocida en Chile por la calidad de sus servicios de ingeniería y mantenimiento.</p></div>
          <div><b>Valores</b><span class="vals">${paginas.nosotros.valores.map((v) => `<span>${esc(v.titulo)}</span>`).join("")}</span></div>
        </div>
      </div>
    </section>

    <section class="guar">
      <div class="wrap">
        <div class="shead"><div><p class="eyebrow-m">Garantías y respaldo</p><h3>Condiciones claras antes,<br>durante y después del trabajo.</h3></div><a class="rbtn" href="garantias.html" style="background:#0A2342;color:#fff">Ver garantías y respaldo →</a></div>
        <div class="guar__g">${aspectos.map((a) => `<div>${ico(a.icono)}<b>${esc(a.titulo)}</b><p>${esc(a.texto.split(". ")[0].replace(/\.$/, ""))}.${marca(a)}</p></div>`).join("")}</div>
      </div>
    </section>

    <section class="faqs">
      <div class="wrap faq__g">
        <div><p class="eyebrow-m">Preguntas frecuentes</p><h3 style="font-size:clamp(24px,3.4cqi,36px);font-weight:800;margin:8px 0 14px">Lo que más nos preguntan.</h3><a class="rbtn" href="preguntas-frecuentes.html" style="border-color:#C5CFDA;color:#0A2342">Ver todas las preguntas</a></div>
        <div class="faq">${faq.map((f, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(f.pregunta)}</summary><p>${esc(f.respuesta)}${marca(f)}</p></details>`).join("")}</div>
      </div>
    </section>

    <div class="wrap"><div class="cta"><div class="t"><p class="eyebrow-m" style="color:#7FB2F0">Hablemos</p><h3>¿Qué necesita tu instalación?</h3><p style="color:#C9D4E2;font-size:15px">Cuéntanos el servicio y la comuna. Te respondemos con una cotización clara.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="rbtn" href="contacto.html" style="background:#fff;color:#0A2342">Solicitar cotización</a><a class="rbtn" href="${wa("Hola, quiero una cotización.")}" target="_blank" rel="noopener" style="border-color:rgba(255,255,255,.4);color:#fff">WhatsApp</a></div></div><div class="p">${imgTag("inicio-cta")}</div></div></div>`;
  const ld = [{
    "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", name: sitio.nombre, url: `${sitio.dominio}/`,
    telephone: sitio.telefono, email: sitio.correo, logo: `${sitio.dominio}/logo-navy.webp`,
    areaServed: { "@type": "AdministrativeArea", name: `${sitio.cobertura}, Chile` },
    makesOffer: servicios.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.nombre, url: `${sitio.dominio}/${s.slug}.html` } })),
  }, faqLd(faq)];
  documento({
    ruta: "index.html", titulo: "GSU Ingeniería y Mantenimiento · Región Metropolitana",
    descripcion: "Electricidad, climatización, gasfitería, impermeabilización, soldadura, electrónica, cercos eléctricos, cámaras de seguridad y mantenimiento para hogares y empresas. Solicita tu cotización.",
    cuerpo, ld, preload: heroImg && heroImg.srcset ? `<link rel="preload" as="image" href="${heroImg.src}" imagesrcset="${heroImg.srcset}" imagesizes="100vw" fetchpriority="high">` : "",
  });
}

// ---------- páginas de servicio ----------

function construirServicio(s) {
  const donde = `Servicio · ${s.nombreCorto}`;
  const caps = s.capacidades.filter((c) => visible(c, donde, c.titulo));
  const faq = s.faq.filter((f) => visible(f, donde, f.pregunta));
  const cap = `<div class="cap">
          <p class="crumbs micro"><a href="index.html">Inicio</a><span>/</span><a href="servicios.html">Servicios</a><span>/</span><span>${esc(s.nombreCorto)}</span></p>
          <p class="eyebrow-m" style="color:${s.claro}">${esc(s.division)}</p>
          <h1>${esc(s.titulo)}</h1>
          <p class="deck">${esc(s.deck)}</p>
          <div class="acts"><a class="rbtn" href="${cotizar(s.slug)}" style="background:${s.boton};color:${s.botonTexto}">Solicitar cotización</a><a class="rbtn" href="${wa(`Hola, quiero información sobre ${s.nombreCorto}.`)}" target="_blank" rel="noopener" style="border-color:rgba(255,255,255,.5);color:#fff">WhatsApp</a></div>
        </div>`;
  const cuerpo = `
    <section class="svc-sec" style="--acc:${s.color};--tinte:${s.tinte}">
      ${banner(s, { hero: true, cap })}
    </section>

    <section class="blk" style="--acc:${s.color};--tinte:${s.tinte};--acc-text:${s.boton === "#FFC72C" || s.boton === "#C2D62E" ? "#0A2342" : s.boton}">
      <div class="wrap intro-grid">
        <div>
          <p class="eyebrow-m">El servicio</p>
          <h2 style="font-size:clamp(26px,3.4vw,42px);font-weight:800;letter-spacing:-.02em;margin:8px 0 18px">Qué hacemos en ${esc(s.nombreCorto)}</h2>
          <div class="prose"><p>${esc(s.presentacion)}</p></div>
        </div>
        <div class="worklist">
          <h3>Trabajos que puede contemplar</h3>
          <ul>${s.trabajos.map((t) => `<li>${ico("check")}<span>${esc(t)}</span></li>`).join("")}</ul>
          <small>El alcance exacto se define en cada cotización.</small>
        </div>
      </div>
    </section>

    <section class="section section--alt">
      <div class="section__head"><div><p class="section__eyebrow micro">¿Qué necesitas?</p><h2 class="section__title">Identifica tu situación</h2></div><p class="section__deck">Elige la situación que más se parece a la tuya.</p></div>
      <div class="scenario-grid">${s.situaciones.map((c) => `
        <div class="scenario-card reveal-up">
          <p class="scenario-card__title">${esc(c.titulo)}</p>
          <p class="scenario-card__text">${esc(c.texto)}</p>
          <ul class="scenario-card__list">${c.puntos.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
          ${c.whatsapp ? `<a class="scenario-card__cta" href="${wa(c.whatsapp)}" target="_blank" rel="noopener">Escribir por WhatsApp →</a>` : `<a class="scenario-card__cta" href="${cotizar(s.slug)}">Solicitar cotización →</a>`}
        </div>`).join("")}
      </div>
    </section>

    <section class="section">
      <div class="section__head"><div><p class="section__eyebrow micro">Qué incluye</p><h2 class="section__title">Capacidades</h2></div></div>
      <div class="cap-grid">${caps.map((c, i) => `
        <div class="cap-card reveal-up delay-${(i % 4) + 1}"><div class="cap-card__icon">${ico(c.icono, ' style="width:36px;height:36px"')}</div><h3 class="cap-card__title">${esc(c.titulo)}</h3><p class="cap-card__text">${esc(c.texto)}${marca(c)}</p></div>`).join("")}
      </div>
    </section>

    <section class="blk blk--alt" style="--acc:${s.color}">
      <div class="wrap">
        <div class="blk__head"><div><p class="eyebrow-m">Beneficios</p><h2>Lo que ganas con un trabajo bien hecho</h2></div></div>
        <div class="benefits">${s.beneficios.map((b) => `<div class="benefit"><span class="bar"></span><b>${esc(b.titulo)}</b><p>${esc(b.texto)}</p></div>`).join("")}</div>
      </div>
    </section>

    ${procesoTimeline({ titulo: "Proceso de atención, en cinco etapas." })}

    <section class="section">
      <div class="section__head"><div><p class="section__eyebrow micro">Preguntas frecuentes</p><h2 class="section__title">Preguntas sobre ${esc(s.nombreCorto)}</h2></div></div>
      ${faqLista(faq, s.slug)}
    </section>

    ${ctaBanda(`Cotiza ${s.nombreCorto}`, "Cuéntanos qué necesitas y en qué comuna. Te respondemos con una cotización clara.", s.slug)}

    <section class="section">
      <div class="section__head"><div><p class="section__eyebrow micro">Servicios relacionados</p><h2 class="section__title">También podría interesarte</h2></div><a class="btn btn--ghost-dark" href="servicios.html">Ver todos los servicios</a></div>
      <div class="mini-carousel">
        <div class="mini-carousel__track">${[...s.relacionados, ...sitio.servicios.filter((x) => x !== s.slug && !s.relacionados.includes(x))].slice(0, 6).map((slug) => {
          const r = S[slug];
          const im = imagen(r.banner.imagen);
          return `
          <a class="mini-carousel__item" href="${slug}.html">
            ${im ? `<img src="${im.src}"${im.srcset ? ` srcset="${im.srcset}" sizes="(max-width:780px) 78vw, 380px"` : ""} alt="" loading="lazy" decoding="async">` : `<span style="position:absolute;inset:0;background:linear-gradient(160deg,${r.color},#0A2342)"></span>`}
            <div class="mini-carousel__scrim"></div>
            <div class="mini-carousel__label"><strong>${esc(r.nombreCorto)}</strong><span class="micro" style="color:var(--alloy)">${esc(r.resumen)}</span></div>
          </a>`;
        }).join("")}
        </div>
        <div class="mini-carousel__nav">
          <button class="mini-carousel__btn" type="button" data-dir="prev" aria-label="Anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg></button>
          <button class="mini-carousel__btn" type="button" data-dir="next" aria-label="Siguiente"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></button>
        </div>
      </div>
    </section>`;
  documento({
    ruta: `${s.slug}.html`, titulo: s.seo.titulo, descripcion: s.seo.descripcion, cuerpo, imagenOg: s.banner.imagen,
    ld: [
      { "@context": "https://schema.org", "@type": "Service", name: s.nombre, description: s.presentacion, areaServed: `${sitio.cobertura}, Chile`, provider: { "@type": "HomeAndConstructionBusiness", name: sitio.nombre, url: `${sitio.dominio}/`, telephone: sitio.telefono } },
      { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Inicio", item: `${sitio.dominio}/` }, { "@type": "ListItem", position: 2, name: "Servicios", item: `${sitio.dominio}/servicios.html` }, { "@type": "ListItem", position: 3, name: s.nombre, item: `${sitio.dominio}/${s.slug}.html` }] },
      faqLd(faq),
    ],
  });
}

// ---------- páginas corporativas ----------

function construirServicios() {
  const cuerpo = `
    ${heroSimple({ titulo: "Servicios", eyebrow: "Especialidades", deck: "Todas las especialidades técnicas de tu instalación, coordinadas por un mismo equipo.", migas: [{ texto: "Servicios" }] })}
    <section class="blk">
      <div class="wrap">
        <div class="svc-cards">${servicios.map((s) => `
          <article class="svc-card">
            <div class="svc-card__img">${imagen(s.banner.imagen) ? imgTag(s.banner.imagen, { sizes: "(max-width:560px) 100vw, (max-width:900px) 50vw, 33vw" }) : `<span class="fill" style="background:linear-gradient(160deg,${s.color},#0A2342)"></span>`}<span class="tag" style="--c:${s.color};--ct:${s.colorTexto}">${ico(ICONO_SERVICIO[s.slug])}${esc(s.division)}</span></div>
            <div class="svc-card__body"><h3>${esc(s.nombre)}</h3><p>${esc(s.resumen)}</p>
              <div class="svc-card__links"><a class="rbtn" href="${s.slug}.html" style="background:#0A2342;color:#fff">Ver servicio</a><a class="rbtn" href="${cotizar(s.slug)}" style="border-color:#C5CFDA;color:#0A2342">Solicitar cotización</a></div>
            </div>
          </article>`).join("")}
        </div>
      </div>
    </section>
    ${procesoTimeline()}
    ${ctaBanda("¿No sabes qué especialidad necesitas?", "Cuéntanos qué pasa en tu instalación y te orientamos con una cotización.", null)}`;
  documento({ ruta: "servicios.html", titulo: "Servicios de ingeniería y mantenimiento · GSU", descripcion: "Electricidad, climatización, gasfitería, impermeabilización, soldadura, electrónica, cercos eléctricos, cámaras de seguridad y mantenimiento general en la Región Metropolitana.", cuerpo });
}

function construirNosotros() {
  const n = paginas.nosotros;
  const cuerpo = `
    ${heroSimple({ titulo: "Nosotros", eyebrow: "GSU Ingeniería y Mantenimiento", deck: sitio.lema + ".", imagenId: "mantenimiento-integral-banner", migas: [{ texto: "Nosotros" }] })}
    <section class="blk">
      <div class="wrap intro-grid">
        <div><p class="eyebrow-m">Quiénes somos</p><h2 style="font-size:clamp(26px,3.4vw,42px);font-weight:800;letter-spacing:-.02em;margin:8px 0 18px">Soluciones técnicas para que tus espacios funcionen</h2><div class="prose">${n.quienes.map((p) => `<p>${esc(p)}</p>`).join("")}</div></div>
        <div class="worklist" style="--tinte:#E8ECEF"><h3>Nuestras especialidades</h3><ul>${servicios.map((s) => `<li>${ico(ICONO_SERVICIO[s.slug])}<a href="${s.slug}.html" style="color:inherit">${esc(s.nombre)}</a></li>`).join("")}</ul></div>
      </div>
    </section>
    <section class="blk blk--alt">
      <div class="wrap mv2">
        <article><p class="eyebrow-m">Misión</p><h3>Por qué existimos</h3>${n.mision.map((p) => `<p>${esc(p)}</p>`).join("")}</article>
        <article><p class="eyebrow-m">Visión</p><h3>Hacia dónde vamos</h3>${n.vision.map((p) => `<p>${esc(p)}</p>`).join("")}</article>
      </div>
    </section>
    <section class="blk blk--dark">
      <div class="wrap">
        <div class="blk__head"><div><p class="eyebrow-m">Valores corporativos</p><h2>Cómo trabajamos cada día</h2></div></div>
        <div class="vgrid">${n.valores.map((v) => `<div>${ico(v.icono)}<b>${esc(v.titulo)}</b><p>${esc(v.texto)}</p></div>`).join("")}</div>
      </div>
    </section>
    <section class="blk">
      <div class="wrap intro-grid">
        <div><p class="eyebrow-m">Compromiso con el cliente</p><h2 style="font-size:clamp(26px,3.4vw,42px);font-weight:800;letter-spacing:-.02em;margin:8px 0 18px">Atención cercana, ordenada y orientada a resultados</h2><div class="prose">${n.compromiso.map((p) => `<p>${esc(p)}</p>`).join("")}</div></div>
        <div><p class="eyebrow-m">Quién está detrás</p><div class="team" style="margin-top:16px;grid-template-columns:1fr">${n.equipo.map((e) => `<div><span>${esc(e.cargo)}</span><b>${esc(e.nombre)}</b><p>${esc(e.texto)}</p></div>`).join("")}</div></div>
      </div>
    </section>
    ${ctaBanda("Hablemos de tu proyecto", "Cuéntanos qué necesitas y te respondemos con una cotización clara.", null)}`;
  documento({ ruta: "nosotros.html", titulo: "Nosotros · GSU Ingeniería y Mantenimiento", descripcion: "Quiénes somos, misión, visión, valores y compromiso con el cliente de GSU Ingeniería y Mantenimiento.", cuerpo, imagenOg: "mantenimiento-integral-banner" });
}

function construirComoTrabajamos() {
  const cuerpo = `
    ${heroSimple({ titulo: "Cómo trabajamos", eyebrow: "Proceso de atención", deck: "De la solicitud a la entrega, en cinco etapas claras.", migas: [{ texto: "Cómo trabajamos" }] })}
    <section class="blk">
      <div class="wrap">
        <ol class="steps-v">${paginas.proceso.map((p, i) => `<li><span class="n">${i + 1}</span><div><h3>${esc(p.titulo)}</h3><p>${esc(p.texto)}</p></div></li>`).join("")}</ol>
      </div>
    </section>
    <section class="blk blk--alt">
      <div class="wrap intro-grid">
        <div><p class="eyebrow-m">Para cotizar</p><h2 style="font-size:clamp(24px,3vw,36px);font-weight:800;margin:8px 0 16px">Qué nos ayuda a preparar tu cotización</h2><div class="prose"><p>Mientras más antecedentes nos envíes en la solicitud, más precisa será la evaluación técnica y más rápido podremos coordinar una visita si hace falta.</p></div></div>
        <div class="worklist" style="--tinte:#fff"><h3>Envíanos</h3><ul>${["Qué necesitas o qué está fallando", "La comuna o dirección del trabajo", "El tipo de instalación (casa, local, oficina, edificio)", "Fotos de la zona o del equipo, si las tienes"].map((t) => `<li>${ico("check")}<span>${t}</span></li>`).join("")}</ul></div>
      </div>
    </section>
    ${ctaBanda("Empecemos por la solicitud", "Es el primer paso. Cuéntanos qué necesitas.", null)}`;
  documento({ ruta: "como-trabajamos.html", titulo: "Cómo trabajamos · GSU", descripcion: "Solicitud, evaluación técnica, cotización, ejecución y revisión y entrega: así atiende GSU cada trabajo.", cuerpo });
}

function construirGarantias() {
  const g = paginas.garantias;
  const asp = g.aspectos.filter((a) => visible(a, "Garantías y respaldo", a.titulo));
  const cuerpo = `
    ${heroSimple({ titulo: "Garantías y respaldo", eyebrow: "Compromiso con la calidad", deck: "Condiciones claras antes, durante y después de cada trabajo.", migas: [{ texto: "Garantías y respaldo" }] })}
    <section class="blk"><div class="wrap"><div class="prose">${g.intro.map((p) => `<p>${esc(p)}</p>`).join("")}</div></div></section>
    <section class="blk blk--alt">
      <div class="wrap">
        <div class="blk__head"><div><p class="eyebrow-m">Qué cubre este compromiso</p><h2>Aspectos del respaldo</h2></div></div>
        <div class="aspect-grid">${asp.map((a) => `<div class="aspect">${ico(a.icono)}<b>${esc(a.titulo)}</b><p>${esc(a.texto)}${marca(a)}</p></div>`).join("")}</div>
      </div>
    </section>
    ${ctaBanda("¿Tienes una observación sobre un trabajo?", "Escríbenos con el servicio, la fecha y fotos si las tienes. Revisamos cada caso.", null)}`;
  documento({ ruta: "garantias.html", titulo: "Garantías y respaldo · GSU", descripcion: "Alcance del trabajo, revisión y entrega, observaciones posteriores y documentación técnica en los servicios de GSU.", cuerpo });
}

function construirProyectos() {
  const lista = paginas.proyectos;
  const cuerpo = `
    ${heroSimple({ titulo: "Proyectos", eyebrow: "Trabajos realizados", deck: "Trabajos reales de GSU, organizados por especialidad.", migas: [{ texto: "Proyectos" }] })}
    <section class="blk">
      <div class="wrap">
        ${lista.length ? `<div class="aspect-grid">${lista.map((p) => `<article class="aspect">${p.fotos && p.fotos.despues ? `<img src="${esc(p.fotos.despues)}" alt="${esc(p.titulo)}" loading="lazy" style="border-radius:12px;aspect-ratio:4/3;object-fit:cover;width:100%">` : ""}<b>${esc(p.titulo)}</b><p><strong>${esc(S[p.servicio]?.nombreCorto || p.servicio)}</strong></p>${p.necesidad ? `<p><strong>Necesidad:</strong> ${esc(p.necesidad)}</p>` : ""}${p.solucion ? `<p><strong>Solución:</strong> ${esc(p.solucion)}</p>` : ""}${p.alcance ? `<p><strong>Alcance:</strong> ${esc(p.alcance)}</p>` : ""}${p.resultado ? `<p><strong>Resultado:</strong> ${esc(p.resultado)}</p>` : ""}</article>`).join("")}</div>`
        : `<div class="empty"><p class="eyebrow-m">Próximamente</p><h2>Estamos documentando nuestros proyectos</h2><p>Aquí publicaremos trabajos reales de GSU, con fotografías del antes, durante y después, la necesidad del cliente y la solución implementada. Mientras tanto, conoce cómo trabajamos o cuéntanos qué necesitas.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><a class="rbtn" href="como-trabajamos.html" style="background:#0A2342;color:#fff">Cómo trabajamos</a><a class="rbtn" href="contacto.html" style="border-color:#C5CFDA;color:#0A2342">Solicitar cotización</a></div></div>`}
      </div>
    </section>`;
  if (!lista.length) pendientes.push({ donde: "Proyectos", que: "Proyectos reales", nota: "Agregar proyectos en contenido/paginas.json → proyectos, con fotos reales y autorización del cliente." });
  documento({ ruta: "proyectos.html", titulo: "Proyectos · GSU", descripcion: "Trabajos realizados por GSU en electricidad, climatización, gasfitería, impermeabilización, seguridad y mantenimiento.", cuerpo });
}

function construirFaq() {
  const general = paginas.faq.filter((f) => visible(f, "Preguntas frecuentes", f.pregunta));
  const cuerpo = `
    ${heroSimple({ titulo: "Preguntas frecuentes", eyebrow: "Ayuda", deck: "Respuestas a las dudas más comunes sobre nuestros servicios.", migas: [{ texto: "Preguntas frecuentes" }] })}
    <section class="section">
      <div class="faq-group"><h2>Generales</h2>${faqLista(general, "faq")}</div>
      <div class="faq-group"><h2>Por especialidad</h2><p class="section__deck" style="margin-bottom:16px">Cada página de servicio tiene sus propias preguntas frecuentes.</p>
        <div class="svc-card__links">${servicios.map((s) => `<a class="rbtn" href="${s.slug}.html#contenido" style="border-color:#C5CFDA;color:#0A2342">${esc(s.nombreCorto)}</a>`).join("")}</div></div>
    </section>
    ${ctaBanda("¿No encontraste tu respuesta?", "Escríbenos y te respondemos.", null)}`;
  documento({ ruta: "preguntas-frecuentes.html", titulo: "Preguntas frecuentes · GSU", descripcion: "Servicios, cobertura, cotizaciones, mantenimiento, documentación y reclamos: respuestas a las preguntas frecuentes sobre GSU.", cuerpo, ld: [faqLd(general)] });
}

function construirContacto() {
  const opciones = servicios.map((s) => `<option value="${s.slug}">${esc(s.nombre)}</option>`).join("") + '<option value="varias">Varias especialidades / no estoy seguro</option>';
  const horario = visible(sitio.horario, "Contacto", "Horario de atención");
  const cuerpo = `
    ${heroSimple({ titulo: "Contacto y cotizaciones", eyebrow: "Solicitar cotización", deck: "Cuéntanos qué necesitas y dónde. Te respondemos con una cotización clara.", migas: [{ texto: "Contacto" }] })}
    <section class="section">
      <div class="contact-layout">
        <form class="cform" data-contact-form novalidate action="/api/contacto" method="post" enctype="multipart/form-data">
          <div class="form-field" data-field="nombre"><label for="c-nombre">Nombre</label><input id="c-nombre" name="nombre" autocomplete="name" required maxlength="120"><span class="form-error" id="e-nombre">Escribe tu nombre.</span></div>
          <div class="form-field" data-field="empresa"><label for="c-empresa">Empresa <span style="text-transform:none;font-weight:400">(opcional)</span></label><input id="c-empresa" name="empresa" autocomplete="organization" maxlength="120"></div>
          <div class="form-field" data-field="email"><label for="c-email">Correo electrónico</label><input id="c-email" name="email" type="email" autocomplete="email" required maxlength="160"><span class="form-error" id="e-email">Revisa el correo: debe tener la forma nombre@dominio.cl.</span></div>
          <div class="form-field" data-field="telefono"><label for="c-telefono">Teléfono</label><input id="c-telefono" name="telefono" type="tel" autocomplete="tel" required maxlength="30" placeholder="+56 9 1234 5678"><span class="form-error" id="e-telefono">Escribe un teléfono de contacto.</span></div>
          <div class="form-field" data-field="comuna"><label for="c-comuna">Comuna o ubicación del proyecto</label><input id="c-comuna" name="comuna" autocomplete="address-level2" required maxlength="120"><span class="form-error" id="e-comuna">Indica la comuna o ubicación.</span></div>
          <div class="form-field" data-field="servicio"><label for="c-servicio">Especialidad requerida</label><select id="c-servicio" name="servicio" required><option value="">Elige una opción</option>${opciones}</select><span class="form-error" id="e-servicio">Elige una especialidad.</span></div>
          <div class="form-field full" data-field="mensaje"><label for="c-mensaje">Describe lo que necesitas</label><textarea id="c-mensaje" name="mensaje" required maxlength="4000" placeholder="Qué necesitas, qué está fallando, tipo de instalación…"></textarea><span class="form-error" id="e-mensaje">Cuéntanos brevemente qué necesitas.</span></div>
          <div class="form-field full" data-field="fotos"><label for="c-fotos">Fotos <span style="text-transform:none;font-weight:400">(opcional)</span></label><input id="c-fotos" name="fotos" type="file" accept="image/jpeg,image/png,image/webp,image/heic" multiple><span class="hint">Hasta 3 fotos, de 5 MB cada una como máximo.</span><span class="form-error" id="e-fotos">Puedes adjuntar hasta 3 fotos de hasta 5 MB cada una.</span></div>
          <div class="hp" aria-hidden="true"><label for="c-sitio">No completar</label><input id="c-sitio" name="sitio_web" tabindex="-1" autocomplete="off"></div>
          <label class="consent full" data-field="consentimiento"><input type="checkbox" name="consentimiento" value="si" required><span>Acepto que GSU use mis datos para responder esta solicitud, según la <a href="privacidad.html">política de privacidad</a>.</span></label>
          <div class="full"><button class="btn btn--primary" type="submit">Enviar solicitud</button></div>
          <div class="form-status full" role="status" aria-live="polite"></div>
        </form>
        <aside class="contact-card">
          <h2 class="contact-card__title">Otros canales</h2>
          <div class="contact-channel">${ico("chat")}<div><a href="${wa("Hola, quiero una cotización.")}" target="_blank" rel="noopener">WhatsApp ${esc(sitio.telefono)}</a></div></div>
          <div class="contact-channel">${ico("telefono")}<div><a href="tel:${sitio.telefonoLink}">${esc(sitio.telefono)}</a></div></div>
          <div class="contact-channel">${ico("correo")}<div><a href="mailto:${sitio.correo}">${esc(sitio.correo)}</a></div></div>
          <div class="contact-channel">${ico("ubicacion")}<div><span>Cobertura: ${esc(sitio.cobertura)}</span></div></div>
          ${horario ? `<div class="contact-channel">${ico("reloj")}<div><span>Horario: ${marca(sitio.horario)}</span></div></div>` : ""}
        </aside>
      </div>
    </section>`;
  documento({ ruta: "contacto.html", titulo: "Contacto y cotizaciones · GSU", descripcion: "Solicita una cotización a GSU: cuéntanos qué necesitas, en qué comuna y adjunta fotos si las tienes.", cuerpo });
}

function construirPolitica(ruta) {
  const p = paginas.politicas[ruta];
  const secciones = p.secciones.filter((s) => visible(s, p.titulo, s.titulo || "Sección"));
  const cuerpo = `
    ${heroSimple({ titulo: p.titulo, eyebrow: "Políticas", migas: [{ texto: p.titulo }], imagenId: null })}
    <section class="section">
      <div class="legal-content">
        <p class="updated">Última actualización: octubre de 2026</p>
        ${secciones.map((s) => `${s.titulo ? `<h2>${esc(s.titulo)}</h2>` : ""}${s.parrafos.map((x) => `<p>${esc(x)}</p>`).join("")}${marca(s)}`).join("\n        ")}
        ${p.nota ? `<p><em>${esc(p.nota)}</em></p>` : ""}
      </div>
    </section>`;
  documento({ ruta: `${ruta}.html`, titulo: `${p.titulo} · GSU`, descripcion: p.descripcion, cuerpo });
}

function construirLegado(nombre) {
  const meta = legado[nombre];
  const cuerpo = fs.readFileSync(path.join(RAIZ, "contenido", "legado", `${nombre}.html`), "utf8");
  documento({ ruta: `${nombre}.html`, titulo: meta.titulo, descripcion: meta.descripcion, cuerpo, actual: nombre.startsWith("blog") ? "blog.html" : `${nombre}.html` });
}

function construir404() {
  documento({
    ruta: "404.html", titulo: "Página no encontrada · GSU", descripcion: "La página que buscas no existe.", noindex: true,
    cuerpo: `<section class="nf"><div><h1>404</h1><p>No encontramos esta página. Puede que se haya movido.</p><div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><a class="rbtn" href="index.html" style="background:#fff;color:#0A2342">Ir al inicio</a><a class="rbtn" href="servicios.html" style="border-color:rgba(255,255,255,.5);color:#fff">Ver servicios</a></div></div></section>`,
  });
}

// ---------- ejecución ----------

construirInicio();
servicios.forEach(construirServicio);
construirServicios();
construirNosotros();
construirComoTrabajamos();
construirGarantias();
construirProyectos();
construirFaq();
construirContacto();
Object.keys(paginas.politicas).forEach(construirPolitica);
Object.keys(legado).forEach(construirLegado);
construir404();

// visible() también registra los datos generales del sitio
visible(sitio.comunas, "Sitio", "Comunas atendidas");
visible(sitio.plazoRespuesta, "Contacto", "Plazo de respuesta");

const hoy = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(RAIZ, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${generadas.map((r) => `  <url><loc>${r === "index.html" ? `${sitio.dominio}/` : `${sitio.dominio}/${r}`}</loc><lastmod>${hoy}</lastmod></url>`).join("\n")}
</urlset>
`);

const unicos = [...new Map(pendientes.map((p) => [`${p.donde}|${p.que}`, p])).values()];
fs.writeFileSync(path.join(RAIZ, "PENDIENTES.md"), `# Datos que GSU debe completar antes de publicar

Generado por \`npm run build\` el ${hoy}. En la versión publicada estos datos **no aparecen**;
con \`npm run build:revision\` se muestran con una marca amarilla en cada página.
Para completarlos, edita los archivos de \`contenido/\` y quita el campo \`"pendiente"\`.

| Dónde | Qué | Qué falta |
|---|---|---|
${unicos.map((p) => `| ${p.donde} | ${p.que.replace(/\|/g, "/")} | ${p.nota.replace(/\|/g, "/")} |`).join("\n")}
`);

console.log(`${generadas.length + 1} páginas generadas (${REVISION ? "revisión" : "producción"}), ${unicos.length} datos pendientes → PENDIENTES.md`);
