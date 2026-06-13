'use client';
import { useEffect, useRef } from 'react';
import { Button } from '@relume_io/relume-ui';
import { Badge } from '@relume_io/relume-ui';

const STATS = [
  { value: 30, suffix: '+', label: 'Proyectos entregados' },
  { value: 98, suffix: '%', label: 'Satisfacción de clientes' },
  { value: 5, suffix: ' días', label: 'Tiempo promedio MVP' },
];

function useCountUp(ref: React.RefObject<HTMLSpanElement>, target: number) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();
      let start: number | null = null;
      const dur = 1600;
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
      <div className="text-3xl font-display font-bold text-white">
        <span ref={ref}>0</span>{suffix}
      </div>
      <div className="text-sm text-white/50 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#0b1220] pt-16">
      {/* background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-teal-400/8 rounded-full blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center text-center gap-8">
        <Badge className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-1.5 rounded-full font-medium backdrop-blur-sm animate-rise">
          Soluciones Tecnológicas · Chile
        </Badge>

        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white leading-[1.1] max-w-5xl animate-rise [animation-delay:80ms]">
          Convertimos ideas en{' '}
          <em className="not-italic text-gradient">productos digitales</em>{' '}
          que escalan
        </h1>

        <p className="text-white/55 text-lg sm:text-xl max-w-2xl leading-relaxed animate-rise [animation-delay:160ms]">
          Desarrollamos plataformas web, e-commerce y sistemas a medida con tecnología de punta.
          De la idea a producción en tiempo récord.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-rise [animation-delay:240ms]">
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] font-semibold px-8 py-3 rounded-full text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/35 transition-all"
          >
            <a href="#contacto">Cotizar proyecto →</a>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="border-white/15 text-white/80 hover:bg-white/5 hover:text-white hover:border-white/30 px-8 py-3 rounded-full text-base transition-all bg-transparent"
          >
            <a href="#proyectos">Ver proyectos</a>
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-12 mt-8 pt-8 border-t border-white/[0.06] w-full max-w-lg animate-rise [animation-delay:320ms]">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20 animate-pulse" />
        <span className="text-[10px] tracking-widest uppercase">scroll</span>
      </div>
    </section>
  );
}
