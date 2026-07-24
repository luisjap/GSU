'use client';
import { useEffect, useRef } from 'react';

const STATS = [
  { value: 3, suffix: '', label: 'Divisiones técnicas especializadas' },
  { value: 100, suffix: '%', label: 'Técnicos certificados SEC' },
  { value: 24, suffix: 'h', label: 'Respuesta a propuestas técnicas' },
];

function useCountUp(ref: React.RefObject<HTMLSpanElement>, target: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start: number | null = null;
      const dur = 1400;
      const step = (ts: number) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / dur, 1);
        const eased = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(eased * target).toString();
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, target]);
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useCountUp(ref, value);
  return (
    <div className="text-center">
      <div className="text-5xl font-display font-bold text-[#0A2342] font-mono tabular-nums">
        <span ref={ref}>0</span>{suffix}
      </div>
      <div className="text-sm text-[#4B4F54] mt-2">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 border-y border-black/[0.05]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
        {STATS.map((s) => (
          <Stat key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
