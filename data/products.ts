export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'equipos' | 'accesorios' | 'servicios';
  description: string;
  icon: 'ac' | 'wind' | 'wrench' | 'plug' | 'ruler';
  featured?: boolean;
}

// Catálogo de muestra — reemplazar con productos, precios y stock reales antes de publicar.
export const PRODUCTS: Product[] = [
  {
    id: 'split-9000',
    name: 'Split Muro Inverter 9000 BTU Frío/Calor',
    price: 420000,
    category: 'equipos',
    description: 'Ideal para dormitorios y oficinas pequeñas hasta 15 m².',
    icon: 'ac',
  },
  {
    id: 'split-12000',
    name: 'Split Muro Inverter 12000 BTU Frío/Calor',
    price: 470000,
    category: 'equipos',
    description: 'Para espacios de hasta 22 m², bajo consumo eléctrico.',
    icon: 'ac',
    featured: true,
  },
  {
    id: 'split-18000-wifi',
    name: 'Split Muro Inverter 18000 BTU Wifi Frío/Calor',
    price: 630000,
    category: 'equipos',
    description: 'Control por app, hasta 32 m², modo silencioso nocturno.',
    icon: 'ac',
    featured: true,
  },
  {
    id: 'split-24000-wifi',
    name: 'Split Muro Inverter 24000 BTU Wifi Frío/Calor',
    price: 1080000,
    category: 'equipos',
    description: 'Para living-comedor o locales comerciales hasta 45 m².',
    icon: 'ac',
  },
  {
    id: 'soporte-muro',
    name: 'Soporte de Muro para Unidad Exterior',
    price: 35000,
    category: 'accesorios',
    description: 'Soporte reforzado, incluye pernos de anclaje.',
    icon: 'wrench',
  },
  {
    id: 'canaletas-100x50',
    name: 'Canaletas 100x50 (por metro)',
    price: 15000,
    category: 'accesorios',
    description: 'Canalización para ductos de cobre y drenaje.',
    icon: 'ruler',
  },
  {
    id: 'punto-electrico',
    name: 'Punto Eléctrico Dedicado para Split',
    price: 45000,
    category: 'accesorios',
    description: 'Circuito independiente con protección diferencial.',
    icon: 'plug',
  },
  {
    id: 'servicio-instalacion',
    name: 'Servicio de Instalación Estándar',
    price: 150000,
    category: 'servicios',
    description: 'Instalación completa por técnico certificado, incluye prueba de gas.',
    icon: 'wind',
  },
];
