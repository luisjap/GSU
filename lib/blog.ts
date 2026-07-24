export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'certificacion-sec-instalaciones-electricas',
    title: '¿Qué es la certificación SEC y por qué es obligatoria?',
    excerpt:
      'Toda instalación eléctrica o de gas en Chile debe contar con certificación ante la Superintendencia de Electricidad y Combustibles. Esto es lo que implica.',
    date: '2026-06-02',
    category: 'Infraestructura Eléctrica',
    image: 'blog-certificacion-sec',
    content: [
      'La Superintendencia de Electricidad y Combustibles (SEC) es el organismo que fiscaliza las instalaciones eléctricas, de gas y de combustibles en Chile. Su objetivo es garantizar que los proyectos cumplan con normas de seguridad que protegen a las personas y a los inmuebles.',
      'Para instalaciones eléctricas, la certificación relevante es el formulario TE1, que emite un instalador eléctrico autorizado tras verificar que el proyecto cumple con la normativa vigente (NCH Elec. 4/2003, entre otras). Sin esta certificación, la instalación no puede declararse habitable ni conectarse formalmente a la red de distribución en muchos casos.',
      'En la práctica, esto significa que cualquier tablero, circuito o ampliación eléctrica debería ser ejecutado y certificado por un instalador con clase autorizada por la SEC — no por cualquier persona con conocimientos de electricidad. Lo mismo aplica a instalaciones de gas, donde se exige certificación de instaladores de gas autorizados.',
      'Contratar un proveedor que gestione esta certificación como parte del servicio, y no como un trámite aparte, reduce el riesgo de instalaciones no conformes, rechazos posteriores y sobrecostos por corregir trabajos mal ejecutados.',
    ],
  },
  {
    slug: 'mantencion-preventiva-vs-correctiva',
    title: 'Mantención preventiva vs. correctiva: por qué la primera sale más barata',
    excerpt:
      'Esperar a que un equipo falle para actuar suele costar más que mantenerlo. Así se comparan ambos enfoques en infraestructura eléctrica y climatización.',
    date: '2026-05-14',
    category: 'Mantenimiento Integral',
    image: 'blog-mantenimiento-calendario',
    content: [
      'La mantención correctiva ocurre después de una falla: un equipo de climatización deja de enfriar, un tablero eléctrico presenta una falla intermitente. Se resuelve, pero casi siempre en el peor momento — cuando la instalación ya dejó de operar con normalidad.',
      'La mantención preventiva, en cambio, se ejecuta en base a un calendario y a inspecciones periódicas, antes de que ocurra la falla. Para climatización, esto incluye limpieza de filtros y serpentines, revisión de gas refrigerante y de presiones de trabajo. Para electricidad, revisión de conexiones, torque de terminales y termografía de tableros.',
      'El costo de una mantención preventiva programada es predecible y menor al costo de una falla no planificada, que además puede implicar detener una operación (un restaurante, una planta, una clínica) mientras se repara.',
      'Por eso los contratos de mantención mensual — la línea que en GSU llamamos GSU Care — están pensados como una inversión recurrente y no como un gasto excepcional: el objetivo es que la falla no llegue a ocurrir.',
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
