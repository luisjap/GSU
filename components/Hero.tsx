'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { Badge } from '@relume_io/relume-ui';

const PHRASES = [
  'Gasfitería certificada en Santiago para empresas y hogares',
  'Reparaciones eléctricas certificadas ante la SEC',
  'Contratos de mantenimiento de equipos para infraestructura crítica',
];

const ROTATE_MS = 4200;

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function RotatingHeadline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PHRASES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reducedMotion, paused]);

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <h1
        className="grid grid-cols-1 w-full min-w-0 font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0A2342] leading-[1.15]"
        style={{ textWrap: 'balance' }}
      >
        {PHRASES.map((phrase, i) => {
          const isActive = reducedMotion ? i === 0 : active === i;
          return (
            <span
              key={phrase}
              aria-hidden={!isActive}
              className="[grid-area:1/1] min-w-0 transition-all duration-700 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                visibility: isActive ? 'visible' : 'hidden',
                transform: isActive ? 'translateY(0)' : 'translateY(10px)',
              }}
            >
              {phrase}
            </span>
          );
        })}
      </h1>

      {!reducedMotion && (
        <div className="flex gap-2 mt-8 justify-center lg:justify-start" role="tablist" aria-label="Frases del titular">
          {PHRASES.map((phrase, i) => (
            <button
              key={phrase}
              role="tab"
              aria-selected={active === i}
              aria-label={`Mostrar frase ${i + 1} de ${PHRASES.length}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? 'w-6 bg-electric' : 'w-1.5 bg-black/15 hover:bg-black/25'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA]">
      {/* glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-electric/8 rounded-full blur-[130px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-electric-light/8 rounded-full blur-[110px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="flex flex-col gap-7 text-center lg:text-left items-center lg:items-start min-w-0 w-full">
          <Badge className="bg-electric-soft border border-electric/20 text-electric text-xs px-4 py-1.5 rounded-full font-medium animate-rise">
            GSU Ingeniería y Mantenimiento
          </Badge>

          <div className="animate-rise [animation-delay:80ms] w-full">
            <RotatingHeadline />
          </div>

          <p className="text-[#4B4F54] text-lg leading-relaxed max-w-xl animate-rise [animation-delay:160ms]">
            Diseñamos, instalamos y mantenemos infraestructura eléctrica y climatización con
            técnicos certificados, propuesta técnica clara y garantía del trabajo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-rise [animation-delay:240ms]">
            <Button
              asChild
              className="bg-electric hover:bg-electric-light text-white font-semibold px-8 py-3 rounded-full text-base shadow-lg shadow-electric/20 transition-all"
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
        </div>

        {/* visual */}
        <div className="relative aspect-square max-w-md mx-auto lg:max-w-none w-full rounded-[2.5rem] overflow-hidden border border-black/[0.05]">
          <Image
            src="/images/library/home-hero.webp"
            alt="Técnico de GSU trabajando en una sala eléctrica"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/15 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
