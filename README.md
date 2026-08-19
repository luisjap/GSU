# GSU — Ingeniería y Mantenimiento

Sitio scroll-driven de una sola página: una secuencia de video (desktop 16:9 /
mobile 9:16) controlada por el scroll, con capítulos por servicio (Climatic,
Electric, Gasfiter, Security, Solder, Care), un carrusel de servicios y
contacto directo por WhatsApp.

Ver `BRAND.md` para la estrategia de marca (paleta, tipografía, tono) que
rige el diseño y el copy de este sitio.

## Stack

- HTML + CSS + JavaScript vanilla, sin build step
- `serve` como servidor estático en producción
- Desplegado en Railway

## Desarrollo local

```bash
python3 -m http.server 8080
# o
npx serve .
```

Abrir `http://localhost:8080`.

## Estructura

- `index.html` — el sitio completo (markup, estilos y motor de scroll en un solo archivo)
- `frames/desktop/` y `frames/mobile/` — 540 fotogramas WebP por versión (secuencia de scroll)
- `hero-still.webp` / `hero-still-mobile.webp` — imagen estática del hero antes de iniciar el scroll
- `logo-white.webp` / `logo-navy.webp` — logo GSU (versión inversa y principal)
- `favicons/` — íconos de pestaña/app

## Deploy en Railway

1. El repo ya está conectado a Railway (proyecto existente, servicio enlazado a `main`).
2. `railway.json` define `npm install` como build y `npm start` (sirve la carpeta con `serve`) como comando de arranque.
3. `PORT` la inyecta Railway automáticamente.
4. Cada push a `main` redeploya solo.

## Historial

Este repo alojaba antes una aplicación Next.js (tienda, blog, checkout). Ese
proyecto no se eliminó: hay un respaldo completo (código + `git log`) en
`../GSU-nextjs-backup-2026-08-19/`, y también sigue disponible en el
historial de git de este mismo repo (commits anteriores a este cambio).
