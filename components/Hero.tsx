'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';
import { Badge } from '@relume_io/relume-ui';

const SLIDES = [
  {
    phrase: 'Gasfitería certificada en Santiago para empresas y hogares',
    image: '/images/library/hero-banner-tecnico.webp',
    alt: 'Instalación de gasfitería GSU',
  },
  {
    phrase: 'Climatización y ventilación certificada para empresas y hogares',
    image: '/images/library/hero-banner-climatizacion.webp',
    alt: 'Equipo de climatización instalado por GSU',
  },
  {
    phrase: 'Contratos de mantención para infraestructura eléctrica crítica',
    image: '/images/library/hero-banner-electrico.webp',
    alt: 'Tablero eléctrico mantenido por GSU',
  },
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

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reducedMotion, paused]);

  return (
    <section
      className="relative overflow-hidden bg-[#0A2342] min-h-[560px] lg:min-h-[680px] flex items-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* background slides — same index drives image + headline, so they change together */}
      <div className="absolute inset-0 grid">
        {SLIDES.map((slide, i) => {
          const isActive = reducedMotion ? i === 0 : active === i;
          return (
            <div
              key={slide.image}
              aria-hidden={!isActive}
              className="[grid-area:1/1] relative transition-opacity duration-1000 ease-out"
              style={{ opacity: isActive ? 1 : 0 }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A2342]/95 via-[#0A2342]/75 to-[#0A2342]/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/70 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-36">
        <div className="flex flex-col gap-7 max-w-2xl min-w-0">
          <Badge className="bg-white/10 border border-white/20 text-white text-xs px-4 py-1.5 rounded-full font-medium animate-rise w-fit">
            GSU Ingeniería y Mantenimiento
          </Badge>

          <div className="animate-rise [animation-delay:80ms] w-full">
            <h1
              className="grid grid-cols-1 w-full min-w-0 font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.15]"
              style={{ textWrap: 'balance' }}
            >
              {SLIDES.map((slide, i) => {
                const isActive = reducedMotion ? i === 0 : active === i;
                return (
                  <span
                    key={slide.phrase}
                    aria-hidden={!isActive}
                    className="[grid-area:1/1] min-w-0 transition-all duration-700 ease-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      visibility: isActive ? 'visible' : 'hidden',
                      transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                    }}
                  >
                    {slide.phrase}
                  </span>
                );
              })}
            </h1>

            {!reducedMotion && (
              <div className="flex gap-2 mt-8 justify-start" role="tablist" aria-label="Servicios destacados">
                {SLIDES.map((slide, i) => (
                  <button
                    key={slide.phrase}
                    role="tab"
                    aria-selected={active === i}
                    aria-label={`Mostrar servicio ${i + 1} de ${SLIDES.length}`}
                    onClick={() => setActive(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      active === i ? 'w-6 bg-electric-light' : 'w-1.5 bg-white/25 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <p className="text-white/80 text-lg leading-relaxed max-w-xl animate-rise [animation-delay:160ms]">
            Diseñamos, instalamos y mantenemos infraestructura eléctrica, climatización y gasfitería
            con técnicos certificados, propuesta técnica clara y garantía del trabajo.
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
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 rounded-full text-base transition-all bg-transparent"
            >
              <a href="/tienda">Ver tienda</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
