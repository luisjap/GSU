# GSU — Image Map (asignación estratégica de la biblioteca al sitio)

Documento de planificación únicamente. **No modifica diseño ni componentes** —
define qué imagen de las 115 de `public/images/library/` va en cada lugar
del sitio, y por qué. La integración real (paso 2) es un trabajo aparte.

Principios aplicados: no repetir la misma imagen en dos secciones
consecutivas de una misma página; equilibrar personas / infraestructura /
detalle técnico; reservar explícitamente lo que no tiene un lugar hoy
porque la página/sección aún no existe, en vez de forzarlo.

## Home (`app/page.tsx`)

| Página | Sección | Imagen | Justificación |
|---|---|---|---|
| Home | Hero (desktop) | `hero-fachada-corporativa` | Cinematográfica, espacio negativo para el titular, refuerza "empresa de ingeniería moderna" — no una foto de servicio puntual. |
| Home | Hero (mobile) | `home-hero` | Mismo tono, encuadre ya centrado para recorte vertical; evita repetir la imagen de escritorio 1:1. |
| Home | Marquee (fondo sutil) | `home-marquee-bg` | Textura de ductos/bandejas, generada específicamente para este uso. |
| Home | Servicios — GSU Electric | `servicio-electrica-2` | Instalación de tablero, representa el servicio principal de la división. |
| Home | Servicios — GSU Climate | `servicio-climatizacion-1` | Técnico en unidad VRV/VRF en azotea. |
| Home | Servicios — GSU Hydro | `servicio-hidraulica-1` | Sala de bombas, técnico revisando presurización. |
| Home | Servicios — GSU Care | `servicio-mantenimiento-1` | Mantención preventiva con checklist en tablet. |
| Home | Products (preview tienda) | `tienda-header` | Ya diseñada para este bloque desde Fase 1. |
| Home | Coverage — Certificación SEC | `seguridad-checklist` | Checklist/LOTO comunica cumplimiento normativo. |
| Home | Coverage — Propuesta técnica clara | `smart-reporte-digital` | Reporte digital = "sabes exactamente qué cubre". |
| Home | Coverage — Garantía y respaldo documental | `premium-cableado` | Cableado organizado como metáfora visual de calidad/respaldo — evita repetir `proceso-entrega`, ya usado en Process. |
| Home | Coverage — Empresas y hogares | `cliente-jefe-mantenimiento` | Persona cliente en contexto, comunica el vínculo con administradores de edificios/empresas. |
| Home | Process — 01 Diagnóstico y propuesta | `proceso-diagnostico` | Coincide exactamente con el nombre del paso. |
| Home | Process — 02 Aceptación y orden de trabajo | `proceso-propuesta` | Documento/propuesta técnica sobre escritorio. |
| Home | Process — 03 Ejecución certificada | `proceso-trabajo` | Técnico ejecutando instalación. |
| Home | Process — 04 Informe técnico y garantía | `proceso-entrega` | Informe firmado, cierre del proceso. |
| Home | CTA banner | `banner-equipo` | 21:9, equipo caminando — transmite cercanía y escala, como pediste. |
| Home | Contact (fondo de sección) | `landing-contacto` | Generada con espacio negativo pensado exactamente para este bloque. |
| Global | Footer | `textura-panel-electrico` | Textura sutil, no compite con los links; da cierre "técnico" a la página. |
| Global | Open Graph / share por defecto | `hero-fachada-corporativa` | Reusar el hero del Home como preview social es intencional (mismo contexto de marca), no un descuido — el OG no es visible dentro del sitio. |

## `/tienda`

| Sección | Imagen | Justificación |
|---|---|---|
| Header | `tienda-header` | Misma imagen que el preview en Home — es la misma página de destino, refuerza continuidad en vez de generar disonancia. |

## `/checkout`

Sin imagen — página funcional de formulario, coherente con el diseño minimalista actual. Decisión deliberada, no un olvido.

## `/nosotros`

| Sección | Imagen | Justificación |
|---|---|---|
| Hero / intro | `nosotros-equipo` | Grupo de técnicos, se alinea con el título "Ingeniería aplicada al funcionamiento continuo". |
| Propósito/Misión/Visión/Qué somos (grid de texto) | `textura-superficie-tecnica` (fondo sutil, opcional) | El grid ya funciona solo con texto; textura solo si se quiere romper el bloque blanco. |
| Manifiesto (bloque navy) | Sin imagen | El contraste de color sólido es el recurso dramático actual — una imagen de fondo compite con el texto y le resta impacto. Mantener texto puro. |
| Valores (grid de íconos) | Sin imagen | Los íconos ya cumplen la función; no forzar fotografía donde el ícono comunica mejor. |

## `/sectores`

| Sección | Imagen | Justificación |
|---|---|---|
| Hero | `landing-sectores` | Generada específicamente para este uso (edificio + técnico, espacio negativo). |
| Card — Hoteles | `sector-hotel` | Match directo de Fase 2. |
| Card — Clínicas | `sector-clinica` | Match directo. |
| Card — Hospitales | `sector-hospital` | Match directo. |
| Card — Restaurantes | `sector-restaurante` | Match directo. |
| Card — Condominios | `sector-condominio` | Match directo. |
| Card — Plantas industriales | `sector-industria` | Match directo. |
| Card — Centros comerciales | `sector-retail` | Match directo. |
| Card — Centros logísticos | `sector-logistico` | Match directo. |
| Card — Oficinas | `sector-oficina` | Match directo. |
| Clientes particulares | Sin imagen | Ninguna de las 115 es específicamente residencial/particular — mejor dejar el ícono actual que forzar una imagen que no corresponde al segmento. |

## `/faq`

Sin imagen — página de acordeón, texto puro. Coherente con el diseño actual.

## `/blog` (índice)

| Sección | Imagen | Justificación |
|---|---|---|
| Header | `textura-ductos` | Textura sutil, no compite con las cards de artículos debajo. |
| Card — "¿Qué es la certificación SEC…?" | `blog-certificacion-sec` | Match temático directo. |
| Card — "Mantención preventiva vs. correctiva" | `blog-mantenimiento-calendario` | Match temático (calendario de mantención). |

## `/blog/[slug]` (detalle de artículo)

Misma imagen que la card del índice, como header del artículo — consistencia entre listado y detalle.

## Reservadas para uso futuro (sin página/sección hoy)

No se fuerzan estas imágenes en el diseño actual porque el lugar donde
corresponden todavía no existe como página o sección. Quedan documentadas
para cuando se construyan:

| Futuro lugar | Imágenes reservadas |
|---|---|
| Página individual "Ingeniería Eléctrica" | `hero-sala-tecnica`, `servicio-electrica-1`, `macro-pinza-amperimetrica`, `macro-camara-termografica`, `premium-plc`, `infra-subestacion`, `caso-electrico-antes`, `caso-electrico-despues`, `cliente-reunion-tablero` (narrativa completa, como en tu ejemplo) |
| Página individual "Climatización" | `hero-hvac-industrial`, `servicio-climatizacion-2`, `caso-hvac-antes`, `caso-hvac-despues`, `macro-manometro`, `infra-torres-enfriamiento`, `cliente-dashboard-tablet` |
| Página individual "Sistemas Hidráulicos" | `infra-sala-bombas`, `servicio-hidraulica-2`, `caso-bombas-antes`, `caso-bombas-despues`, `macro-valvula`, `premium-valvula` |
| Página individual "Mantenimiento Integral" (GSU Care) | `servicio-mantenimiento-2`, `mantenimiento-preventivo-1`, `mantenimiento-preventivo-2`, `mantenimiento-correctivo`, `seguridad-epp`, `seguridad-permiso`, `premium-sensor`, `caso-tablero-antes`, `caso-tablero-despues`, `cliente-hotel-informe`, `cliente-entrega-informe` |
| Sección/página "Casos de éxito" (si se separa como página propia) | `caso-hidraulico-antes`, `caso-hidraulico-despues` (los demás pares ya asignados arriba, por división) |
| Sección/página "Emergencias 24/7" (si se decide ofrecer el servicio) | `emergencia-llegada`, `emergencia-inspeccion`, `emergencia-reparacion`, `emergencia-restablecimiento` |
| Sección/página "Proyectos" | `proyecto-instalacion`, `proyecto-ductos`, `proyecto-entrega` |
| Página overview "/servicios" (si se separa de la sección de Home) | `servicios-header` |
| Próximos artículos de blog (9 restantes, temas ya definidos en el Style Lock) | `blog-seguridad-electrica`, `blog-eficiencia-energetica`, `blog-filtro-hvac`, `blog-red-tuberias`, `blog-capacitacion`, `blog-eficiencia-bombas`, `blog-deteccion-fugas`, `blog-automatizacion`, `blog-gestion-activos` |
| Nosotros — galería de equipo (si se agrega) | `nosotros-reunion`, `nosotros-planos`, `nosotros-vehiculo` |
| Hero rotativo / A-B de Home | `home-hero-alt`, `home-institucional`, `hero-instalacion-grande`, `hero-tecnico-espacio-amplio` |
| Banners de campaña alternativos | `banner-fachada`, `banner-sala-tecnica`, `landing-tienda`, `cta-banner` (variante 16:9 del CTA, alternativa a `banner-equipo` 21:9) |
| GSU Care / seguimiento (si se separa como contenido propio) | `proceso-inspeccion`, `proceso-seguimiento`, `smart-qr-escaneo` |
| Smart Maintenance (si se crea una sección dedicada a tecnología) | `smart-dashboard-kpi`, `smart-mantenimiento-predictivo`, `smart-sensor-iot`, `smart-bim-gemelo-digital` |
| Fondos/texturas decorativas restantes | `textura-acero`, `textura-malla-metalica`, `textura-tuberias` |
| Contacto — imágenes de apoyo no usadas en el bloque actual | `contacto-oficina`, `contacto-atencion` |

## Uso fuera del sitio web (redes sociales, no wireado a ninguna página)

| Formato | Imágenes |
|---|---|
| Instagram/LinkedIn cuadrado (1:1) | `social-tecnico-1x1`, `social-sala-tecnica-1x1` |
| Instagram/LinkedIn vertical (3:4, sustituto de 4:5) | `social-tecnico-3x4`, `social-equipo-3x4` |
| Stories / Reels (9:16) | `social-detalle-9x16`, `social-hero-9x16` |

## Siguiente paso

Este documento no toca código. La integración real (paso 2 de tu plan:
Hero real en `components/Hero.tsx`, imágenes en las 4 cards de
`components/Services.tsx`, etc.) es un trabajo de implementación aparte —
avisame cuándo quieres que lo haga.
