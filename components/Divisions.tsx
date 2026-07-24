import { Zap, Wind, ShieldCheck, ArrowRight } from 'lucide-react';

const DIVISIONS = [
  {
    icon: Zap,
    name: 'GSU Electric',
    desc: 'Infraestructura eléctrica, tableros y certificación TE1 ante la SEC.',
  },
  {
    icon: Wind,
    name: 'GSU Climate',
    desc: 'Climatización y ventilación: split, multi split y sistemas VRV/VRF.',
  },
  {
    icon: ShieldCheck,
    name: 'GSU Care',
    desc: 'Mantenimiento integral con contratos mensuales e inspecciones periódicas.',
  },
];

export default function Divisions() {
  return (
    <section className="relative px-4 sm:px-6 -mt-10 sm:-mt-14 z-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
        {DIVISIONS.map((d) => (
          <a
            key={d.name}
            href="/#servicios"
            className="group flex flex-col bg-white rounded-2xl border border-black/[0.06] shadow-lg shadow-black/[0.04] p-6 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-electric-soft text-electric flex items-center justify-center mb-4">
              <d.icon size={20} strokeWidth={2} />
            </div>
            <h3 className="font-display font-semibold text-lg text-[#0A2342] mb-1.5">{d.name}</h3>
            <p className="text-[#4B4F54] text-sm leading-relaxed mb-4">{d.desc}</p>
            <span className="mt-auto inline-flex items-center gap-1 text-electric text-sm font-medium group-hover:gap-1.5 transition-all">
              Ver más
              <ArrowRight size={14} />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
