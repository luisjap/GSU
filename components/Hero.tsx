'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { Badge } from '@relume_io/relume-ui';
import { MessageCircle, Phone } from 'lucide-react';
import { whatsappLink, WHATSAPP_NUMBER } from '@/lib/contact';

const STATS = [
  { value: 4, suffix: '', label: 'Divisiones de ingeniería' },
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
      <div className="text-3xl font-display font-bold text-[#0A2342] font-mono tabular-nums">
        <span ref={ref}>0</span>{suffix}
      </div>
      <div className="text-sm text-[#4B4F54] mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#E8ECEF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start">
          <Badge className="bg-brand-soft border border-brand/15 text-brand-dark text-xs px-4 py-1.5 rounded-full font-medium animate-rise">
            GSU Ingeniería y Mantenimiento · Chile
          </Badge>

          <h1
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A2342] leading-[1.1] animate-rise [animation-delay:80ms]"
            style={{ textWrap: 'balance' }}
          >
            Ingeniería aplicada a{' '}
            <em className="not-italic text-gradient">la continuidad operacional</em>
          </h1>

          <p className="text-[#4B4F54] text-lg leading-relaxed max-w-xl animate-rise [animation-delay:160ms]">
            Diseñamos, instalamos y mantenemos infraestructura eléctrica, climatización y sistemas
            hidráulicos con técnicos especialistas, propuesta técnica clara y garantía del trabajo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-rise [animation-delay:240ms]">
            <Button
              asChild
              className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3 rounded-full text-base shadow-lg shadow-brand/20 transition-all"
            >
              <a href="/#contacto">Solicitar propuesta técnica →</a>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="border-black/10 text-[#0A2342] hover:bg-black/[0.03] px-8 py-3 rounded-full text-base transition-all bg-transparent"
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

        {/* visual — fachada corporativa (escritorio) / sala técnica (móvil) */}
        <div className="relative max-w-md mx-auto lg:max-w-none w-full pb-6">
          <div className="relative aspect-square w-full rounded-[2.5rem] overflow-hidden border border-black/[0.05]">
            <Image
              src="/images/library/home-hero.webp"
              alt="Técnico de GSU trabajando en una sala eléctrica"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="lg:hidden object-cover"
            />
            <Image
              src="/images/library/hero-fachada-corporativa.webp"
              alt="Fachada corporativa moderna — GSU Ingeniería y Mantenimiento"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="hidden lg:block object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
          </div>

          {/* floating contact buttons — fuera del contenedor con overflow-hidden para no cortarse */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#25D366] text-[#0A2342] text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:brightness-105 transition-all"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href={`tel:+${WHATSAPP_NUMBER}`}
              className="flex items-center gap-2 bg-brand-dark text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg hover:brightness-105 transition-all"
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
