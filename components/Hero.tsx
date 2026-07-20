'use client';
import { useEffect, useRef } from 'react';
import { Button } from '@relume_io/relume-ui';
import { Badge } from '@relume_io/relume-ui';
import { AirVent, MessageCircle, Phone } from 'lucide-react';

const STATS = [
  { value: 3, suffix: '', label: 'Especialidades certificadas' },
  { value: 100, suffix: '%', label: 'Técnicos certificados SEC' },
  { value: 24, suffix: 'h', label: 'Respuesta a cotizaciones' },
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
    <div className="text-center sm:text-left">
      <div className="text-3xl font-display font-bold text-[#10231a] font-mono tabular-nums">
        <span ref={ref}>0</span>{suffix}
      </div>
      <div className="text-sm text-[#5b6b62] mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f7faf8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start">
          <Badge className="bg-leaf-soft border border-leaf/15 text-leaf-dark text-xs px-4 py-1.5 rounded-full font-medium animate-rise">
            GSU Servicios y Mantenimiento · Chile
          </Badge>

          <h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#10231a] leading-[1.1] animate-rise [animation-delay:80ms]"
            style={{ textWrap: 'balance' }}
          >
            Expertos en instalación y mantención de{' '}
            <em className="not-italic text-gradient">gasfitería, electricidad y climatización</em>
          </h1>

          <p className="text-[#5b6b62] text-lg leading-relaxed max-w-xl animate-rise [animation-delay:160ms]">
            Técnicos certificados, anticipo transparente y garantía del trabajo. Un solo proveedor
            para empresas y hogares en Chile.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-rise [animation-delay:240ms]">
            <Button
              asChild
              className="bg-leaf hover:bg-leaf-light text-white font-semibold px-8 py-3 rounded-full text-base shadow-lg shadow-leaf/20 transition-all"
            >
              <a href="/#contacto">Solicitar cotización →</a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-black/10 text-[#10231a] hover:bg-black/[0.03] px-8 py-3 rounded-full text-base transition-all bg-transparent"
            >
              <a href="/tienda">Ver tienda</a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 mt-4 pt-7 border-t border-black/[0.06] w-full max-w-lg animate-rise [animation-delay:320ms]">
            {STATS.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </div>
        </div>

        {/* visual */}
        <div className="relative aspect-square max-w-md mx-auto lg:max-w-none w-full">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-leaf-soft via-white to-frost/10 border border-black/[0.05]" />
          <div className="absolute top-8 right-8 w-40 h-40 rounded-full bg-leaf/10 blur-2xl" />
          <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-frost/15 blur-2xl" />
          <div className="absolute inset-0 flex items-center justify-center">
            <AirVent size={140} strokeWidth={1} className="text-leaf/60" />
          </div>

          {/* floating contact buttons */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
            <a
              href="/#contacto"
              className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:brightness-105 transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="/#contacto"
              className="flex items-center gap-2 bg-volt text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:brightness-105 transition-all"
            >
              <Phone size={15} />
              Llamar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
