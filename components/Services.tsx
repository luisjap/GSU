'use client';
import { useRef } from 'react';
import {
  Zap, ShieldCheck, Wind, Snowflake, Flame, Droplet,
  Wrench, ClipboardCheck, CalendarCheck, FileText,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

const SERVICES = [
  { icon: Zap, title: 'Instalación eléctrica', desc: 'Tableros, circuitos y certificación TE1.' },
  { icon: ShieldCheck, title: 'Certificación SEC', desc: 'Declaraciones de instalación eléctrica y gas.' },
  { icon: Wind, title: 'Climatización', desc: 'Split, multi split y sistemas VRV/VRF.' },
  { icon: Snowflake, title: 'Ventilación', desc: 'Extracción, inyección y renovación de aire.' },
  { icon: Flame, title: 'Gasfitería', desc: 'Redes de gas, artefactos y certificación Clase 3.' },
  { icon: Droplet, title: 'Redes de agua', desc: 'Agua potable y alcantarillado para hogares y empresas.' },
  { icon: Wrench, title: 'Mantenimiento correctivo', desc: 'Diagnóstico y reparación de fallas.' },
  { icon: ClipboardCheck, title: 'Mantenimiento preventivo', desc: 'Inspecciones periódicas para evitar fallas.' },
  { icon: CalendarCheck, title: 'Contratos mensuales', desc: 'Mantención recurrente para empresas.' },
  { icon: FileText, title: 'Propuesta técnica', desc: 'Cotización clara con alcance y garantía.' },
];

export default function Services() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section id="servicios" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="text-electric text-sm font-semibold tracking-widest uppercase">Servicios completos</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
              Todo lo que tu instalación<br />necesita, en un solo lugar
            </h2>
          </div>
          <div className="hidden sm:flex gap-2 shrink-0">
            <button
              onClick={() => scrollByAmount(-1)}
              aria-label="Servicios anteriores"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A2342] hover:bg-electric-soft hover:border-electric/20 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scrollByAmount(1)}
              aria-label="Siguientes servicios"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A2342] hover:bg-electric-soft hover:border-electric/20 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="shrink-0 snap-start w-[200px] sm:w-[220px] flex flex-col gap-3 rounded-2xl bg-[#F5F7FA] border border-black/[0.05] p-5 hover:bg-electric-soft hover:border-electric/15 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-white text-electric flex items-center justify-center shadow-sm">
                <s.icon size={18} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[#0A2342] font-display font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-[#4B4F54] text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
