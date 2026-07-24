# GSU Ingeniería y Mantenimiento — Brandbook (resumen operativo)

Referencia de marca que rige el copy y el diseño de este repo. Si vas a escribir
copy nuevo o tocar el sistema de diseño, lee esto primero.

## 1. ADN de marca

- **Esencia**: Ingeniería aplicada al funcionamiento continuo de las instalaciones.
- **Propósito**: Mantener operativos los espacios donde las personas viven,
  trabajan y producen, mediante soluciones técnicas confiables ejecutadas con
  estándares de ingeniería.
- **Misión**: Diseñar, instalar, reparar y mantener sistemas eléctricos,
  de climatización y de gasfitería ofreciendo soluciones eficientes, seguras
  y duraderas para empresas y particulares.
- **Visión**: Ser la empresa chilena referente en ingeniería aplicada al
  mantenimiento de infraestructura.
- **Valores**: Profesionalismo, Seguridad, Honestidad, Confiabilidad,
  Innovación, Calidad.

## 2. Qué somos / qué vendemos

No somos una empresa de "maestros" ni de reparaciones domésticas. Somos una
empresa técnica de ingeniería.

No vendemos electricidad → vendemos **continuidad operacional**.
No vendemos aire acondicionado → vendemos **confort**.
No vendemos reparaciones → vendemos **tranquilidad**.

## 3. Arquitectura de marca — 4 divisiones

```
                        GSU
            Ingeniería y Mantenimiento
──────────────────────────────────────────────
            Infraestructura Técnica
┌───────────┬───────────┬───────────┬────────────┐
│  Electric │  Climate  │    Gas    │    Care    │
└───────────┴───────────┴───────────┴────────────┘
```

Cada división puede crecer (energías renovables, automatización, domótica,
CCTV, redes) sin afectar la marca principal.

| División | Foco | Servicios |
|---|---|---|
| **GSU Electric** | Infraestructura Eléctrica | Tableros, alumbrado, canalizaciones, certificación SEC/TE1, mantención |
| **GSU Climate** | Climatización y Ventilación | Split, multi split, VRV/VRF, chillers, ventilación, calefacción |
| **GSU Gas** | Gasfitería | Redes de gas y agua potable, alcantarillado, conexión de artefactos (cocinas, calefonts, calderas), pruebas de hermeticidad y certificación de instalaciones de gas ante la SEC (Instalador Clase 3) |
| **GSU Care** | Mantenimiento Integral | Contratos mensuales (ingreso recurrente — prioridad de negocio), inspecciones, auditorías, planes anuales |

Implementado en `components/Divisions.tsx` (franja de 4 divisiones) y
`components/Contact.tsx` (selector de especialidad).

## 4. Identidad verbal — siempre / nunca

| No decir | Decir |
|---|---|
| Arreglamos | Diagnosticamos e implementamos soluciones |
| Maestro | Técnico especialista |
| Hacemos de todo / todo en uno | Soluciones integrales para infraestructura técnica |
| Presupuesto / cotización | Propuesta técnica |
| Trabajo terminado | Proyecto entregado |
| Aire acondicionado (como categoría pública) | Climatización y Ventilación |

Evitar además: "pega", "barato", "económico", "mil usos".

Tono: claro, técnico, educativo, respetuoso, profesional. Nunca vulgar,
exagerado, informal ni sensacionalista.

> ❌ "Somos los mejores de Chile."
> ✔ "Aplicamos procedimientos técnicos para garantizar instalaciones seguras y confiables."

## 5. Arquetipo y personalidad

Principal: **El Cuidador** (mantiene, protege, previene, genera tranquilidad).
Secundario: **El Sabio** (conocimiento, experiencia, diagnóstico, precisión).

Personalidad: profesional, técnica, precisa, responsable, moderna, ordenada,
confiable, cercana sin perder autoridad.

## 6. Tagline

**"Ingeniería aplicada a la continuidad operacional."** (usado en Hero y CtaBanner)

## 7. Modelo de negocio (4 líneas de ingreso)

1. Servicios puntuales (una instalación)
2. Proyectos (remodelaciones, climatización completa)
3. **Contratos** (GSU Care — prioridad, ingreso mensual recurrente)
4. Venta de productos (equipos, repuestos, materiales — sección `/tienda`)

## 8. Sistema de diseño implementado

### Colores (`tailwind.config.ts`)

| Token Tailwind | Hex | Uso | % |
|---|---|---|---|
| `brand` | `#0057B8` | Azul Corporativo — CTA, acentos, precios | 70% |
| `brand-dark` | `#0A2342` | Azul Oscuro — títulos, texto fuerte, hover | 15% |
| `graphite` | `#4B4F54` | Gris Grafito — texto secundario/muted | 10% |
| `mist` (`#E8ECEF`) | — | Fondos de sección alternados | 3% |
| blanco | `#FFFFFF` | Fondo base, respiración visual | 2% |

Reglas: sin degradados en el logo, colores sobrios, sin iconos con relleno o
caricaturescos (lineales, grosor uniforme).

### Tipografía (`app/globals.css`, `tailwind.config.ts`)

- **Montserrat** (`font-display`) — títulos, botones.
- **Inter** (`font-sans`) — cuerpo de texto, web.
- **Roboto Mono** (`font-mono`) — datos técnicos, precios, series.

### Iconografía

Lucide React, lineales, sin relleno, un solo color por contexto (azul
corporativo) — sin codificar por color cada división (a diferencia de una
versión anterior que usaba un color distinto por especialidad).

## 8bis. Espaciado, radios y elevación

- **Espaciado**: se usa la escala por defecto de Tailwind (4/8/12/16/24/32/40/48/64/80/96/128px vía `p-1`…`p-32`), que ya coincide con la escala pedida — no se define una escala custom para evitar duplicar lo que Tailwind ya resuelve.
- **Radios**: `rounded-xl` (12px) en inputs/badges, `rounded-2xl` (16px) en cards, `rounded-full` en botones y pills. `--radius: 0.75rem` en `globals.css` para componentes Radix/Relume.
- **Elevación**: `shadow-sm` (reposo) → `hover:shadow-lg hover:shadow-black/[0.05]` (hover de cards) → `shadow-lg shadow-brand/20` (CTA primario) → `shadow-2xl` (drawers/modales). No se usan más de 4 niveles para mantener la jerarquía simple.

## 10. Base de datos (Prisma + Railway Postgres)

`prisma/schema.prisma` define 3 modelos — `ContactRequest`, `Order`, `OrderItem` —
apuntando a `env("DATABASE_URL")`. Sin esa variable configurada, el schema
igual genera el cliente (`prisma generate`, parte del script `build`) pero
`/api/contact` y `/api/orders` detectan su ausencia y solo hacen `console.log`,
sin intentar conectarse.

**Para activar la persistencia real en Railway:**

1. En el proyecto de Railway, agregar el plugin de Postgres — inyecta
   `DATABASE_URL` automáticamente al servicio.
2. Ejecutar una vez `npx prisma migrate dev --name init` (o `prisma db push`
   para no versionar migraciones) con esa `DATABASE_URL` disponible, para
   crear las tablas. Esto requiere una sesión con acceso a esa base de datos
   — no se generó aquí porque este repo no tiene una instancia real conectada.
3. Redeploy — a partir de ahí, cada solicitud de contacto y cada pedido queda
   guardado además de logueado.

No se implementó panel admin ni portal de clientes todavía — quedan para
cuando haya datos reales que mostrar.

## 9. Pendiente / fuera de alcance de este repo

El brandbook también define papelería, uniformes, vehículos, redes sociales y
un sitio multi-página (Proyectos, Casos de éxito, Portal Cliente, panel
admin). Ese alcance requiere contenido real del negocio (casos, testimonios)
e infraestructura adicional (CMS, autenticación) que no existen hoy en este
repo — no están implementados aquí para evitar contenido inventado o
infraestructura sin credenciales reales.

Imágenes corporativas (kie.ai): pendientes de que la política de red del
entorno permita `api.kie.ai`, o de que se generen fuera de esta sesión y se
suban al repo.
