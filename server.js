const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/* ---- Link previews: Open Graph del demoUrl de cada proyecto ----
 * Como se ve el link al compartirlo: og:image + favicon + dominio.
 * Fallback: screenshot real de la página (thum.io) si no hay og:image. */
const PREVIEW_TTL = 24 * 60 * 60 * 1000;
const previewCache = new Map();

function pickMeta(html, prop) {
  const a = html.match(
    new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, 'i'),
  );
  if (a) return a[1];
  const b = html.match(
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, 'i'),
  );
  return b ? b[1] : null;
}

async function linkPreview(url) {
  const hit = previewCache.get(url);
  if (hit && Date.now() - hit.at < PREVIEW_TTL) return hit.data;

  const host = new URL(url).hostname;
  const data = {
    domain: host,
    favicon: `https://www.google.com/s2/favicons?domain=${host}&sz=64`,
    image: `https://image.thum.io/get/width/640/crop/400/${url}`,
    title: null,
    description: null,
  };
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LuDevPreview/1.0)' },
    });
    const html = await res.text();
    const og = pickMeta(html, 'og:image');
    if (og) data.image = new URL(og, res.url ?? url).href;
    data.title = pickMeta(html, 'og:title') ?? html.match(/<title[^>]*>([^<]*)/i)?.[1] ?? null;
    data.description = pickMeta(html, 'og:description') ?? pickMeta(html, 'description');
  } catch (e) {
    console.warn(`Preview de ${host} sin OG (${e.message}); usando screenshot`);
  }
  previewCache.set(url, { at: Date.now(), data });
  return data;
}

/** Proyectos: viven en data/projects.json — editar ahí, sin tocar código.
 *  Cada proyecto sale enriquecido con su link preview (SEO real del demo). */
app.get('/api/projects', async (_req, res) => {
  try {
    const raw = fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf8');
    const projects = JSON.parse(raw);
    const enriched = await Promise.all(
      projects.map(async (p) => ({
        ...p,
        preview: p.demoUrl ? await linkPreview(p.demoUrl).catch(() => null) : null,
      })),
    );
    res.json(enriched);
  } catch (e) {
    console.error('No se pudo leer projects.json:', e.message);
    res.status(500).json({ error: 'No se pudieron cargar los proyectos' });
  }
});

/** Contacto: por ahora solo loguea; listo para enchufar Resend/SendGrid */
app.post('/api/contact', (req, res) => {
  const { name, email, message, service } = req.body ?? {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos: nombre, email y mensaje son obligatorios' });
  }
  console.log(
    `[cotización] ${new Date().toISOString()} — ${name} <${email}>${service ? ` · ${service}` : ''}: ${message}`,
  );
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Lu.dev corriendo en http://localhost:${PORT}`));
