'use client';
import { Zap, Snowflake, Droplet, ShieldCheck } from 'lucide-react';

const DIVISIONS = [
  {
    icon: Zap,
    name: 'GSU Electric',
    title: 'Infraestructura Eléctrica',
    desc: 'Tableros, alumbrado, canalizaciones y certificación eléctrica TE1 ante la SEC.',
    tags: ['Tableros', 'Certificación SEC', 'Mantención'],
  },
  {
    icon: Snowflake,
    name: 'GSU Climate',
    title: 'Climatización y Ventilación',
    desc: 'Equipos split, multi split, VRV/VRF, ventilación y mantención de gas refrigerante.',
    tags: ['Split / VRV / VRF', 'Ventilación', 'Mantención'],
  },
  {
    icon: Droplet,
    name: 'GSU Hydro',
    title: 'Sistemas Hidráulicos',
    desc: 'Redes de agua potable y sanitarias, bombas, presurización y detección de fugas.',
    tags: ['Redes hidráulicas', 'Bombas', 'Presurización'],
  },
  {
    icon: ShieldCheck,
    name: 'GSU Care',
    title: 'Mantenimiento Integral',
    desc: 'Contratos de mantención mensual, inspecciones, diagnósticos y planes anuales.',
    tags: ['Contratos mensuales', 'Inspecciones', 'Diagnóstico'],
  },
];

function DivisionCard({ icon: Icon, name, title, desc, tags }: (typeof DIVISIONS)[number]) {
  return (
    <div
      className="group relative rounded-2xl bg-white border border-black/[0.06] p-7 overflow-hidden cursor-default
        hover:shadow-lg hover:shadow-black/[0.05] hover:-translate-y-0.5 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-brand" />

      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-brand-soft text-brand transition-transform duration-300 group-hover:scale-110">
        <Icon size={22} strokeWidth={2} />
      </div>

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
