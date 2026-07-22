'use client';
import { Zap, Snowflake, Droplet, ShieldCheck } from 'lucide-react';

const DIVISIONS = [
  {
    icon: Zap,
    image: 'servicio-electrica-2',
    name: 'GSU Electric',
    title: 'Infraestructura Eléctrica',
    desc: 'Tableros, alumbrado, canalizaciones y certificación eléctrica TE1 ante la SEC.',
    tags: ['Tableros', 'Certificación SEC', 'Mantención'],
  },
  {
    icon: Snowflake,
    image: 'servicio-climatizacion-1',
    name: 'GSU Climate',
    title: 'Climatización y Ventilación',
    desc: 'Equipos split, multi split, VRV/VRF, ventilación y mantención de gas refrigerante.',
    tags: ['Split / VRV / VRF', 'Ventilación', 'Mantención'],
  },
  {
    icon: Droplet,
    image: 'servicio-hidraulica-1',
    name: 'GSU Hydro',
    title: 'Sistemas Hidráulicos',
    desc: 'Redes de agua potable y sanitarias, bombas, presurización y detección de fugas.',
    tags: ['Redes hidráulicas', 'Bombas', 'Presurización'],
  },
  {
    icon: ShieldCheck,
    image: 'servicio-mantenimiento-1',
    name: 'GSU Care',
    title: 'Mantenimiento Integral',
    desc: 'Contratos de mantención mensual, inspecciones, diagnósticos y planes anuales.',
    tags: ['Contratos mensuales', 'Inspecciones', 'Diagnóstico'],
  },
];

function DivisionCard({ icon: Icon, image, name, title, desc, tags }: (typeof DIVISIONS)[number]) {
  return (
    <div
      className="group relative rounded-2xl bg-white border border-black/[0.06] overflow-hidden cursor-default
        hover:shadow-lg hover:shadow-black/[0.05] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={`/images/library/${image}.webp`}
          alt={title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="absolute top-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center bg-white/90 text-brand backdrop-blur-sm"
        >
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="p-7">
        <span className="text-brand text-[11px] font-semibold tracking-widest uppercase">{name}</span>
        <h3 className="mt-1 text-[#0A2342] font-display font-semibold text-xl mb-2">{title}</h3>
        <p className="text-[#4B4F54] text-sm leading-relaxed mb-5">{desc}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-brand/25 text-brand"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="bg-[#E8ECEF] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Infraestructura técnica</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
            Cuatro divisiones técnicas,<br />una misma ingeniería
          </h2>
          <p className="mt-4 text-[#4B4F54] text-lg leading-relaxed">
            Coordinamos técnicos especialistas certificados para diseño, instalación, mantención y
            reparación — un solo proveedor en vez de múltiples contratistas independientes.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIVISIONS.map((d) => (
            <DivisionCard key={d.name} {...d} />
          ))}
        </div>
      </div>
    </section>
  );
}
