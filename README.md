# Lu.dev — Portfolio

Portfolio personal de Lu (Full-Stack Developer). Landing page servida por
Node.js + Express, sin base de datos: los proyectos viven en un JSON local.

## Stack

- Node.js + Express (servidor + API)
- HTML / CSS / JS vanilla (sin frameworks)
- Modo oscuro automático (`prefers-color-scheme`)
- Mobile-first, animaciones con Intersection Observer

## Instalación local

```bash
npm install
npm run dev      # con recarga (nodemon) — http://localhost:3000
# o
npm start        # producción local
```

## Cómo agregar un proyecto

Edita `data/projects.json` y agrega un objeto con este schema (sin tocar código):

```json
{
  "id": "mi-proyecto",
  "title": "Nombre del proyecto",
  "description": "Descripción corta, máximo 120 caracteres",
  "longDescription": "Descripción larga opcional",
  "category": "personal",            // "personal" | "cliente"
  "status": "completado",            // "completado" | "en-progreso" | "archivado"
  "thumbnail": "/images/projects/mi-proyecto.svg",
  "tech": ["React", "Node.js"],
  "demoUrl": "https://...",
  "repoUrl": "https://github.com/...",
  "featured": false,                 // true => badge ★ DESTACADO
  "year": 2026
}
```

Coloca la imagen en `public/images/projects/` (SVG/PNG/WebP, ideal 16:9).

## Deploy en Railway

1. Sube el repo a GitHub y conéctalo en Railway (New Project → Deploy from GitHub repo).
2. Railway detecta Node y usa `npm start` (también está `railway.json` con el start command).
3. `PORT` la inyecta Railway automáticamente — no hay que configurar nada.
4. Cada push a `main` redeploya solo.

## API

| Endpoint | Descripción |
|---|---|
| `GET /api/projects` | Devuelve el JSON de proyectos |
| `POST /api/contact` | Recibe `{name, email, message}`; por ahora loguea en consola (listo para enchufar Resend — ver `.env.example`) |
