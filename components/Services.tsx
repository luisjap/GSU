'use client';
import { Droplet, Zap, Snowflake, Cpu, ArrowRight } from 'lucide-react';

const SPECIALTIES = [
  {
    icon: Droplet,
    title: 'Gasfitería',
    desc: 'Griferías, artefactos sanitarios, calefonts y redes de agua y gas, con certificación SEC cuando corresponde.',
    accent: '#0d9488',
    tags: ['Instalación', 'Mantención', 'Reparación'],
  },
  {
    icon: Zap,
    title: 'Electricidad',
    desc: 'Tableros, circuitos, iluminación y certificación eléctrica TE1 ante la SEC.',
    accent: '#2563eb',
    tags: ['Instalación', 'Mantención', 'Reparación'],
  },
  {
    icon: Snowflake,
    title: 'Climatización',
    desc: 'Aire acondicionado, calefacción, ductos y mantención de gas refrigerante.',
    accent: '#0891b2',
    tags: ['Instalación', 'Mantención', 'Reparación'],
  },
];

function SpecialtyCard({ icon: Icon, title, desc, accent, tags }: (typeof SPECIALTIES)[number]) {
  return (
    <div
      className="group relative rounded-2xl bg-white border border-black/[0.06] p-7 overflow-hidden cursor-default
        hover:shadow-lg hover:shadow-black/[0.05] hover:-translate-y-0.5 transition-all duration-300"
    >
      {/* rail — el color identifica la especialidad, no es decorativo */}
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${accent}14`, color: accent }}
      >
        <Icon size={22} strokeWidth={2} />
      </div>

      <h3 className="text-[#10231a] font-display font-semibold text-xl mb-2">{title}</h3>
      <p className="text-[#5b6b62] text-sm leading-relaxed mb-5">{desc}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="text-[11px] font-medium px-2.5 py-1 rounded-full border"
            style={{ borderColor: `${accent}40`, color: accent }}
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
    <section id="servicios" className="bg-[#f2f7f4] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <span className="text-leaf text-sm font-semibold tracking-widest uppercase">Especialidades</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#10231a] leading-tight">
            Tres oficios certificados,<br />un solo proveedor
          </h2>
          <p className="mt-4 text-[#5b6b62] text-lg leading-relaxed">
            Coordinamos técnicos certificados para instalación, mantención y reparación —
            tú tratas con un solo proveedor en vez de tres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SPECIALTIES.map((s) => (
            <SpecialtyCard key={s.title} {...s} />
          ))}
        </div>

        {/* línea secundaria — deliberadamente más discreta */}
        <a
          href="/#contacto"
          className="mt-4 group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white/60 px-6 py-5 hover:bg-white hover:border-black/[0.1] transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-black/[0.04] flex items-center justify-center text-[#5b6b62] shrink-0">
              <Cpu size={18} strokeWidth={2} />
            </div>
            <div>
              <span className="text-[#5b6b62]/70 text-[11px] font-medium uppercase tracking-widest">Línea complementaria</span>
              <p className="text-[#334a3d] text-sm mt-0.5">
                Soluciones tecnológicas: sistemas de gestión y automatización para tu negocio.
              </p>
            </div>
          </div>
          <ArrowRight size={16} className="text-[#5b6b62] group-hover:translate-x-0.5 transition-all shrink-0" />
        </a>
      </div>
    </section>
  );
}
