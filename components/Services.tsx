'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
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

const CARD_GAP = 16; // px, matches gap-4

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startX: number; startScrollLeft: number } | null>(null);
  const reduce = useReducedMotion();

  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);

    const firstCard = el.children[0] as HTMLElement | undefined;
    if (firstCard) {
      const step = firstCard.offsetWidth + CARD_GAP;
      setActiveIndex(Math.round(el.scrollLeft / step));
    }
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  // desktop mouse drag-to-scroll — touch/pen keep native momentum + snap
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = { startX: e.clientX, startScrollLeft: el.scrollLeft };
    el.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !dragRef.current) return;
    el.scrollLeft = dragRef.current.startScrollLeft - (e.clientX - dragRef.current.startX);
  };
  const endDrag = () => {
    dragRef.current = null;
  };

  return (
    <section id="servicios" className="bg-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex items-end justify-between gap-4"
        >
          <div className="max-w-2xl">
            <span className="text-electric text-sm font-semibold tracking-widest uppercase">Servicios completos</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
              Todo lo que tu instalación<br />necesita, en un solo lugar
            </h2>
          </div>
          <div className="hidden sm:flex gap-2 shrink-0">
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.9 }}
              onClick={() => scrollByAmount(-1)}
              disabled={atStart}
              aria-label="Servicios anteriores"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A2342] hover:bg-electric-soft hover:border-electric/20 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileTap={reduce ? undefined : { scale: 0.9 }}
              onClick={() => scrollByAmount(1)}
              disabled={atEnd}
              aria-label="Siguientes servicios"
              className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[#0A2342] hover:bg-electric-soft hover:border-electric/20 transition-all duration-200 disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          ref={scrollerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 cursor-grab active:cursor-grabbing select-none [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              variants={itemVariants}
              whileHover={reduce ? undefined : { y: -6 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={`group shrink-0 snap-start w-[200px] sm:w-[220px] flex flex-col gap-3 rounded-2xl border p-5 transition-colors duration-300 ${
                i === activeIndex
                  ? 'bg-electric-soft border-electric/25'
                  : 'bg-[#F5F7FA] border-black/[0.05] hover:border-electric/15'
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-white text-electric flex items-center justify-center shadow-sm transition-all duration-300 group-hover:bg-electric group-hover:text-white group-hover:shadow-md group-hover:shadow-electric/25">
                <s.icon size={18} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[#0A2342] font-display font-semibold text-sm mb-1">{s.title}</h3>
                <p className="text-[#4B4F54] text-xs leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-5 h-1 w-full max-w-[180px] rounded-full bg-black/[0.06] overflow-hidden">
          <div
            className="h-full w-full rounded-full bg-electric origin-left transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
          />
        </div>
      </div>
    </section>
  );
}
