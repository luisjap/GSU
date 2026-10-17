# GSU — Ingeniería y Mantenimiento

Sitio corporativo de GSU: inicio con una sección por servicio, nueve páginas
de servicio, páginas corporativas (Nosotros, Cómo trabajamos, Garantías,
Proyectos, Preguntas frecuentes), políticas y un formulario de cotización con
envío real por correo.

Ver `BRAND.md` para la marca (paleta, tipografía, tono).

## Cómo cambiar textos

Los textos **no se editan en los `.html`**: esos archivos se generan. Se editan
en `contenido/` y luego se ejecuta `npm run build`.

| Archivo | Qué contiene |
|---|---|
| `contenido/sitio.json` | Teléfono, correo, cobertura, menú, enlaces del pie de página |
| `contenido/servicios/<servicio>.json` | Todo el texto de cada servicio: títulos, presentación, situaciones, capacidades, beneficios, preguntas, colores y palabra del banner |
| `contenido/paginas.json` | Nosotros, proceso de 5 etapas, ¿Por qué elegir GSU?, garantías, preguntas frecuentes, proyectos y políticas |
| `contenido/imagenes.json` | Cada imagen del sitio con su prompt de IA y su ubicación |
| `contenido/legado/` | Blog y cookies (se envuelven con el nuevo encabezado y pie) |

Los textos de composición del inicio (por ejemplo las etiquetas de las
cámaras o las zonas del cerco) están en `herramientas/build.mjs`, función
`seccionServicio`.

### Datos pendientes

Cualquier elemento con un campo `"pendiente": "nota"` **no se publica**.
`npm run build` escribe `PENDIENTES.md` con la lista completa. Para publicar el
dato, completa el texto y borra el campo `"pendiente"`.

Para ver los pendientes marcados en amarillo dentro de las páginas:
`npm run build:revision` (no publicar esa versión; vuelve a correr `npm run build`).

### Proyectos

Se agregan en `contenido/paginas.json` → `proyectos`, solo con trabajos reales
de GSU y autorización del cliente:

```json
{ "titulo": "…", "servicio": "electricidad", "necesidad": "…", "solucion": "…",
  "alcance": "…", "resultado": "…", "fotos": { "despues": "images/proyectos/….webp" } }
```

## Imágenes

Las imágenes de servicios son generadas con IA (kie.ai, modelo nano-banana-pro)
y son **ilustrativas**: nunca se usan en Proyectos. Cada una tiene un prompt
pensado para su ubicación, y una sola versión que funciona en escritorio y en
teléfono (sujeto centrado).

```bash
npm run imagenes                                   # genera las que falten
python3 herramientas/generar_imagenes.py --solo inicio-hero --forzar   # rehace una
```

Requiere la clave `KIE_API_KEY` en el archivo `.env` (git lo ignora) y Pillow.
Cada imagen se guarda en `images/ia/<id>-480.webp`, `-960.webp` y `-1600.webp`.
Cuesta 18 créditos por imagen.

## Desarrollo local

```bash
npm install
npm run build
npm start          # http://localhost:8080
```

## Formulario de cotización

`server.mjs` sirve el sitio y recibe `POST /api/contacto`. Valida los datos,
acepta hasta 3 fotos de 5 MB, tiene campo trampa anti-spam y un límite de 5
envíos cada 10 minutos por IP, y envía la solicitud a `contacto@gsu.cl`.

Variables de entorno en Railway (Variables del servicio):

| Variable | Valor |
|---|---|
| `MAIL_TO` | `contacto@gsu.cl` (valor por defecto) |
| `MAIL_FROM` | remitente verificado, ej. `Sitio GSU <web@gsu.cl>` |
| `RESEND_API_KEY` | si se usa Resend (resend.com), **o bien**: |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | datos SMTP del correo de gsu.cl |

Sin proveedor configurado, el formulario responde con un error y ofrece
WhatsApp: nunca muestra un envío exitoso que no ocurrió.

## Deploy en Railway

`railway.json` ejecuta `npm install` y `npm start`. Los `.html` generados se
suben al repositorio, así que antes de cada push hay que correr `npm run build`.
Cada push a `main` publica el sitio.

## Estructura

- `*.html` — páginas generadas (no editar a mano)
- `styles.css`, `site.js` — estilos y comportamiento compartidos
- `server.mjs` — servidor y formulario
- `contenido/` — textos y datos
- `herramientas/build.mjs` — generador de páginas
- `herramientas/generar_imagenes.py` — generador de imágenes con kie.ai
- `images/ia/` — imágenes generadas · `images/hero-*.webp` — imágenes anteriores (respaldo)
- `admin/cotizador.html` — cotizador interno (no se genera, no está en el sitemap)
- `frames/` — secuencia de 540 fotogramas del sitio anterior; ya no la usa ninguna página
