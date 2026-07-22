# GSU — Style Lock de Fotografía (fuente de verdad)

Documento vivo. Se actualiza cada vez que se aprueba un nuevo estándar
fotográfico. Toda generación de imágenes (IA o fotografía real futura) debe
seguir esta guía.

## Estado de versiones

| Versión | Alcance | Estado |
|---|---|---|
| **v1** | Fase 1 (20 imágenes: Home, Servicios, Nosotros, CTA, Contacto) | **Aprobada para desarrollo** — no se regenera todavía. Congelada tal como está hasta la pasada de consistencia final. |
| **v2** | Fase 2 en adelante | **Obligatoria** desde este documento en adelante |

Regla explícita: no se optimizan/regeneran activos que aún pueden cambiar por
decisiones de diseño en curso (identidad visual, logo, tratamiento
fotográfico). Al completar toda la biblioteca se hace **una única pasada de
consistencia v2 final**, regenerando solo lo que desentone.

## 1. Base fotográfica (sin cambios desde v1)

Fotografía hiperrealista, calidad de producción corporativa profesional
(nivel Siemens/ABB/Schneider Electric). Iluminación natural blanca uniforme,
contraste medio. Color grading frío y consistente: azules ligeramente fríos,
blancos limpios, negros profundos, alta nitidez. Arquitectura moderna,
instalaciones impecables. Composición 16:9 cinematográfica por defecto, líneas
rectas, perspectiva profesional. Sin texto, sin logos, sin marcas de agua,
sin aspecto de render 3D, sin estilo caricaturesco, sin fotografía de stock,
sin poses mirando a cámara, sin sonrisas artificiales, sin desorden ni
suciedad.

## 2. Uniforme único (obligatorio, v2)

Idéntico en **toda** la biblioteca, sin variaciones:

- Camisa técnica gris
- Detalles azul rey (`#0057B8`)
- Logo GSU — se agrega en **postproducción** (nunca generado por IA)
- Pantalón gris grafito
- Casco blanco
- Lentes transparentes
- Guantes negros
- Botines negros

## 3. Vehículos (v2)

Generar únicamente: camioneta blanca, línea azul corporativa, diseño limpio.

**No intentar generar logos, URL, teléfono ni QR con IA** — los modelos de
generación de imágenes no renderizan texto legible de forma confiable. El
branding del vehículo (logo, URL, teléfono, QR) se aplica después como
gráficos vectoriales en diseño, no como parte del prompt.

## 4. Distribución de personas en la biblioteca (v2)

| Categoría | % objetivo |
|---|---|
| Infraestructura sin personas | 40% |
| Técnicos trabajando | 35% |
| Supervisión e ingeniería | 15% |
| Reuniones, planificación, atención, oficina | 10% |

Motivo: la mayoría de empresas del rubro muestran demasiadas personas: GSU
destaca la infraestructura y la calidad técnica primero.

## 5. Categorías de la biblioteca

- **Servicios**: Eléctrica, Climatización, Hidráulica, Mantenimiento
- **Diagnóstico**: ingeniero con tablet/iPad/laptop, software, planos BIM, mediciones
- **Ingeniería**: planos, modelos 3D, planificación, reuniones técnicas
- **Supervisión**: casco blanco + chaleco + tablet, inspección en terreno
- **Seguridad**: checklist, LOTO, EPP, permisos de trabajo
- **Tecnología**: QR, dashboard, historial de mantenimiento digital, reportes
- **Infraestructura** (nueva, sin personas): sala eléctrica, centro de
  control, subestación, sala de bombas, HVAC industrial, sala mecánica,
  tuberías, válvulas, chillers, torres de enfriamiento, cuartos técnicos,
  tableros, canalizaciones, equipos VRF, extractores
- **Macro** (nueva, detalle): manómetro, pinza amperimétrica, cámara
  termográfica, PLC, instrumentos, válvulas, soldaduras, cableado, sensores,
  tableros, terminales
- **Arquitectura** (nueva, exteriores): hoteles, clínicas, hospitales,
  edificios corporativos, centros logísticos, centros comerciales, condominios
- **Nosotros**: equipo, reuniones, planos, vehículos
- **Casos ilustrativos**: escenarios genéricos antes/después (nunca
  atribuidos a un cliente real — ver nota en sección 8)

## 6. Relaciones de aspecto

El modelo (Flux Kontext) soporta nativamente: `21:9`, `16:9`, `4:3`, `1:1`,
`3:4`, `9:16`. Uso por destino:

| Ratio | Uso |
|---|---|
| 16:9 | Hero, secciones principales |
| 4:3 | Cards |
| 1:1 | Instagram |
| 9:16 | Stories / Reels |
| 21:9 | Banners anchos |

No generar las 5 variantes de cada imagen por defecto — encarece el costo
~5x sin necesidad. Se define ratio por pieza según su uso real al momento de
generarla (ver metadata `aspect_ratio`).

## 7. Metadata obligatoria por imagen

Cada imagen se registra en `staging/manifest.json` (y luego en el manifest
final del repo) con:

```json
{
  "id": "servicio-electrica-1",
  "title": "Técnico inspeccionando tablero eléctrico",
  "category": "servicios-electrica",
  "page": "home",
  "orientation": "landscape",
  "aspect_ratio": "16:9",
  "prompt": "...",
  "negative_prompt": "...",
  "generation_date": "2026-07-22",
  "version": "v1",
  "status": "generated",
  "approved": true
}
```

## 8. Casos ilustrativos — recordatorio

No se generan imágenes que aparenten ser proyectos reales de clientes
(antes/después atribuido a un cliente específico). Solo escenarios
genéricos de apoyo visual, reemplazables por fotografía real de proyectos
propios cuando existan.

## 9. Próximo paso (pendiente, no iniciado)

Asset Manager del proyecto: organización automática por categoría, control
de versiones y metadata, detección de duplicados, generación de variantes
optimizadas (WebP/AVIF/thumbnails), `srcset` responsive, export listo para
Next.js. Se aborda después de completar la biblioteca de imágenes.
