# GSU Servicios y Mantenimiento

Landing y tienda online de GSU: gasfitería, electricidad y climatización
certificada para empresas y hogares en Chile.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + Relume UI
- Carrito de compras en cliente (React Context), sin base de datos
- Desplegado en Railway

## Instalación local

```bash
npm install
npm run dev      # http://localhost:4321
```

## Estructura

- `app/page.tsx` — landing (Hero, Servicios, Productos, Cobertura, Proceso, Contacto)
- `app/tienda/` — catálogo de equipos y accesorios (`data/products.ts`)
- `app/checkout/` — flujo de pedido con carrito
- `app/api/contact/` — recibe solicitudes de cotización (`{name, email, message, service}`)
- `app/api/orders/` — recibe pedidos de la tienda (`{name, email, phone, address, comuna, notes, items, total}`)

Ambos endpoints por ahora solo loguean en consola (listos para conectar Resend — ver `.env.example`).

## Cómo agregar un producto

Edita `data/products.ts` y agrega un objeto con este schema:

```ts
{
  id: 'mi-producto',
  name: 'Nombre del producto',
  price: 100000,
  category: 'equipos', // 'equipos' | 'accesorios' | 'servicios'
  description: 'Descripción corta',
  icon: 'ac', // 'ac' | 'wind' | 'wrench' | 'plug' | 'ruler'
  featured: false,
}
```

## Deploy en Railway

1. Sube el repo a GitHub y conéctalo en Railway (New Project → Deploy from GitHub repo).
2. Railway detecta Node y usa `next start` (también está `railway.json` con el start command).
3. `PORT` la inyecta Railway automáticamente — no hay que configurar nada.
4. Cada push a `main` redeploya solo.
