# GSU — Style Lock de Fotografía (fuente de verdad)

Documento vivo. Se actualiza cada vez que se aprueba un nuevo estándar
fotográfico. Toda generación de imágenes (IA o fotografía real futura) debe
seguir esta guía.

## Estado de versiones

| Versión | Alcance | Estado |
|---|---|---|
| **v1** | Fase 1 (20 imágenes: Home, Servicios, Nosotros, CTA, Contacto) | **Aprobada para desarrollo** — no se regenera todavía. Congelada tal como está hasta la pasada de consistencia final. |
| **v2** | Fase 2 (28 imágenes: Sectores/Arquitectura, Proceso, Mantenimiento, Seguridad, Macro, Infraestructura) | **Aprobada** (9.5–10/10). No se regenera todavía. |
| **v2.1** | Fase 3 (28 imágenes: Blog, Casos ilustrativos, Emergencias, Proyectos) | **Aprobada** (9.7/10). No se regenera todavía. |
| **v2.2** | Fase 4 (Biblioteca Premium) en adelante | **Obligatoria** — agrega categoría Smart Maintenance, personas cliente/administrador, y foco en activos reutilizables para marketing |

Regla explícita: no se optimizan/regeneran activos que aún pueden cambiar por
decisiones de diseño en curso (identidad visual, logo, tratamiento
fotográfico). Al completar toda la biblioteca se hace **una única pasada de
consistencia v2 final**, regenerando solo lo que desentone.

## 1. Base fotográfica (actualizado v2.2 — ver nota de causa raíz)

> **Nota de causa raíz (2026-07-22):** la versión original de esta sección
> describía la calidad como "nivel Siemens/ABB/Schneider Electric". Esa frase
> era la causa de que el modelo insertara esos nombres (u otro texto de
> rótulo) como señalética en fachadas — el modelo interpretaba la referencia
> de marca como parte literal de la escena a generar. Se reemplaza por una
> descripción de calidad sin nombres de marca. **No reintroducir nombres de
> empresas reales en ningún prompt de este documento.**

Fotografía hiperrealista, calidad de producción corporativa profesional de
primer nivel (grado editorial/publicitario industrial). Iluminación natural blanca uniforme,
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

## 2bis. Marcas de terceros (obligatorio, v2.1)

No deben aparecer marcas ni logos reconocibles de terceros (ej. Siemens,
ABB) en equipos, edificios, vehículos ni señalética. Usar superficies
limpias sin marca o etiquetado genérico. Si aparece una marca reconocible
en una generación, esa imagen se regenera — no se usa tal cual ni se edita
para tapar el logo.

Excepción acotada: en artículos técnicos de blog donde la marca del equipo
es relevante para el contenido, puede mantenerse. Nunca en imágenes
institucionales o de marketing.

## 2ter. Política de texto no deseado en fachadas — límite de 3 intentos (v2.2)

Los modelos de generación de imágenes tienen un sesgo fuerte a colocar
señalética/texto en accesos de edificios (hoteles, clínicas, hospitales,
restaurantes), incluso con instrucciones explícitas de "sin texto" en el
prompt y el negative prompt.

**Regla:** si una imagen de fachada contiene texto generado por IA que no
puede eliminarse tras **3 intentos de regeneración**, se detiene la
regeneración — ya no es un problema de prompt, es una limitación del
modelo. La resolución pasa a ser una de estas dos, no más intentos de
generación:

1. **Postproducción (preferida):** editar la imagen ya generada (edición
   sobre imagen existente, no regeneración desde cero) para eliminar el
   texto del letrero, dejando la arquitectura intacta y la fachada limpia.
   Nunca agregar el logo de GSU en el lugar del texto eliminado.
2. **Encuadre alternativo:** sustituir por una vista que excluya la zona de
   señalética (ej. ángulo lateral, detalle de fachada, sin el área de
   acceso/entrada).

No se invierten más créditos intentando forzar al modelo a eliminar el
texto más allá del tercer intento.

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

- **Servicios**: Eléctrica, Climatización, Mantenimiento
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

## 5bis. Sectores — identificabilidad sin depender de rótulos (nota para el refresco futuro)

Las 9 fachadas de Fase 2 quedan aprobadas tal cual. Para cuando se
refresquen (pasada de consistencia final), agregar elementos que hagan cada
sector identificable sin depender de texto/rótulo:

- Hospital: ambulancia, acceso de urgencias, señalética sanitaria (sin texto legible)
- Hotel: recepción, lobby, fachada con acceso vehicular
- Centro logístico: muelles de carga, camiones, racks
- Retail: vitrinas, acceso comercial
- Condominio: áreas comunes, acceso residencial

## 5ter. Variedad de planos (obligatorio, v2.1)

Distribución objetivo aproximada por fase (no exacta por imagen):

| Plano | % objetivo |
|---|---|
| General (establishing shot, wide) | 20% |
| Abierto (full/open shot) | 30% |
| Medio (medium shot) | 30% |
| Primer plano / detalle (close-up) | 20% |

## 6. Relaciones de aspecto

El modelo (Flux Kontext) soporta nativamente: `21:9`, `16:9`, `4:3`, `1:1`,
`3:4`, `9:16`. **No soporta `4:5`** — donde se pida ese formato (feeds tipo
Instagram/LinkedIn) se usa `3:4` como el más cercano disponible, o `1:1`.

| Ratio | Uso |
|---|---|
| 16:9 | Hero, secciones principales |
| 4:3 | Cards |
| 1:1 | Instagram / redes |
| 3:4 | Sustituto de 4:5 |
| 9:16 | Stories / Reels |
| 21:9 | Banners anchos |

No generar las 5 variantes de cada imagen por defecto — encarece el costo
~5x sin necesidad. Se define ratio por pieza según su uso real al momento de
generarla (ver metadata `aspect_ratio`).

## 6bis. Fase 4 — Biblioteca Premium (v2.2)

Fase 4 deja de pensarse como "imágenes que faltan" y pasa a ser el cierre
de una **colección definitiva de 100–120 imágenes** para toda la
comunicación de GSU (web, redes, presentaciones comerciales, licitaciones,
brochures) — no solo el sitio web. Incluye:

- **Heroes cinematográficos**: fachadas, salas técnicas espectaculares, HVAC industrial a gran escala
- **Landing**: espacio negativo orientado a conversión
- **Redes sociales**: 1:1, 3:4 (sustituto de 4:5), 9:16
- **Banners**: 21:9 ultra panorámico
- **Texturas y fondos** (sin personas): acero, paneles, ductos, tuberías, mallas metálicas
- **Detalles premium**: instrumentos, válvulas, PLC, sensores, cableado organizado
- **Smart Maintenance** (nueva): dashboards, mantenimiento predictivo, sensores IoT, analítica, reportes digitales, QR + tablet, BIM/gemelos digitales, automatización
- **Cliente/administrador interactuando con el técnico** (nuevo, en toda la biblioteca en adelante): administrador de hotel revisando un informe, jefe de mantenimiento recibiendo una explicación, reunión breve frente a un tablero, entrega de informe, revisión de dashboard en tablet — el cliente nunca es protagonista, es contexto que comunica asesoría y acompañamiento, no solo ejecución.

## 7. Asset Manifest (schema v2, obligatorio desde Fase 3)

Cada imagen se registra en `public/images/library/manifest.json` con este
schema (permite buscar por servicio, página, orientación o contenido):

```json
{
  "id": "proceso-inspeccion-01",
  "title": "Técnico realizando inspección inicial",
  "category": "process",
  "service": "inspection",
  "page": ["home", "process", "services"],
  "orientation": "landscape",
  "aspect_ratio": "16:9",
  "shot": "medio",
  "people": true,
  "industry": ["commercial", "industrial"],
  "contains": ["technician", "electrical_panel", "tablet"],
  "dominant_colors": ["#F5F7FA", "#0057B8", "#6B7280"],
  "prompt": "...",
  "negative_prompt": "...",
  "generation_date": "2026-07-22",
  "version": "v2.1",
  "status": "generated",
  "approved": null
}
```

Fase 1 y Fase 2 usan un schema más simple (sin `service`/`industry`/
`contains`/`dominant_colors`/`shot`) — se migran al schema v2 en la pasada
de consistencia final, no antes (no se toca lo ya aprobado sin necesidad).

## 8. Casos ilustrativos — recordatorio

No se generan imágenes que aparenten ser proyectos reales de clientes
(antes/después atribuido a un cliente específico). Solo escenarios
genéricos de apoyo visual, reemplazables por fotografía real de proyectos
propios cuando existan. Tipos de escena cubiertos:

- Equipos obsoletos vs. modernizados (Fase 3: HVAC)
- Instalaciones desordenadas vs. organizadas (Fase 3: tablero, sala de bombas, red hidráulica)
- Mantenimiento preventivo exitoso (ya cubierto en Fase 2: `mantenimiento-preventivo-1/2`)
- Diagnóstico técnico (ya cubierto en Fase 2: `proceso-diagnostico`)

## 8bis. Emergencias — respuesta controlada (v2.1)

Nunca mostrar: incendios, explosiones, personas heridas, situaciones
caóticas. Mostrar una secuencia de respuesta profesional y en control:
llegada del técnico → inspección inicial → aislamiento del área /
diagnóstico → reparación → restablecimiento del servicio. La sensación debe
ser de control y eficiencia, nunca de crisis.

## 8ter. Blog — biblioteca reutilizable (v2.1)

Las imágenes de blog no se atan a un artículo específico; deben servir para
ilustrar cualquier futuro artículo sobre: ahorro energético, mantenimiento
preventivo, climatización, electricidad, gasfitería, bombas, inspecciones,
seguridad, normativa, eficiencia operacional, automatización, gestión de
activos.

## 9. Próximo paso (pendiente, no iniciado)

Asset Manager del proyecto: organización automática por categoría, control
de versiones y metadata, detección de duplicados, generación de variantes
optimizadas (WebP/AVIF/thumbnails), `srcset` responsive, export listo para
Next.js. Se aborda después de completar la biblioteca de imágenes.
