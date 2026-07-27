'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const DIVISIONS = [
  {
    id: 'electric',
    name: 'GSU Electric',
    eyebrow: 'Infraestructura Eléctrica',
    desc: 'Tableros, certificación TE1 y mantención',
    image: '/images/library/division-electric.webp',
    alt: 'Tablero eléctrico con cableado organizado',
  },
  {
    id: 'climate',
    name: 'GSU Climate',
    eyebrow: 'Climatización y Ventilación',
    desc: 'Split, multi split y sistemas VRV/VRF',
    image: '/images/library/division-climate.webp',
    alt: 'Unidades de climatización industrial',
  },
  {
    id: 'gas',
    name: 'GSU Gas',
    eyebrow: 'Gasfitería',
    desc: 'Redes de gas y agua, certificación SEC Clase 3',
    image: '/images/library/division-gas.webp',
    alt: 'Sala técnica de calefont y redes de gas',
  },
  {
    id: 'care',
    name: 'GSU Care',
    eyebrow: 'Mantenimiento Integral',
    desc: 'Contratos mensuales e inspecciones periódicas',
    image: '/images/library/division-care.webp',
    alt: 'Técnico de GSU con casco de seguridad',
  },
];

const DWELL_VH = 55; // extra scroll room, in vh, kept pinned after fully expanding

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

export default function Divisions() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    let ticking = false;

    const compute = () => {
      ticking = false;
      const rect = wrapper.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the section's top is just entering from the bottom of the
      // viewport, 1 once it reaches the top and becomes fully expanded/pinned.
      const raw = (vh - rect.top) / vh;
      setProgress(Math.min(1, Math.max(0, raw)));
    };


    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const goPrev = () => setStoryIndex((i) => Math.max(0, i - 1));
  const goNext = () => setStoryIndex((i) => Math.min(DIVISIONS.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    // only treat it as a story swipe if it's clearly horizontal — a mostly
    // vertical drag is left alone so it keeps scrolling the page normally.
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  const scale = reducedMotion ? 1 : 0.82 + 0.18 * progress;
  const radius = reducedMotion ? 0 : (1 - progress) * 28;
  const active = DIVISIONS[storyIndex];

  return (
    <>
    {/* mobile/tablet — Instagram-stories style scroll-driven expansion */}
    <section
      ref={wrapperRef}
      className="relative bg-white lg:hidden"
      style={{ height: `calc(100dvh + ${DWELL_VH}dvh)` }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[#0A2342]">
        <div
          className="absolute inset-0"
          style={{
            transform: `scale(${scale})`,
            borderRadius: `${radius}px`,
            transition: 'border-radius 150ms linear',
            overflow: 'hidden',
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {DIVISIONS.map((d, i) => (
            <div
              key={d.id}
              className="absolute inset-0 transition-opacity duration-300"
              style={{ opacity: i === storyIndex ? 1 : 0, pointerEvents: i === storyIndex ? 'auto' : 'none' }}
              aria-hidden={i !== storyIndex}
            >
              <Image
                src={d.image}
                alt={d.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25 pointer-events-none" />

          {/* progress segments, like Instagram stories */}
          <div className="absolute top-4 inset-x-4 z-30 flex gap-1.5">
            {DIVISIONS.map((d, i) => (
              <div key={d.id} className="h-1 flex-1 rounded-full bg-white/30 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: i <= storyIndex ? '100%' : '0%' }}
                />
              </div>
            ))}
          </div>

          <span className="absolute top-9 left-4 z-30 text-white/90 text-xs font-medium tracking-wide">
            {active.eyebrow}
          </span>

          {/* tap zones — left/right navigate between divisions */}
          <button
            aria-label="División anterior"
            onClick={goPrev}
            className="absolute inset-y-0 left-0 w-2/5 z-20"
          />
          <button
            aria-label="División siguiente"
            onClick={goNext}
            className="absolute inset-y-0 right-0 w-2/5 z-20"
          />

          <div className="absolute bottom-0 left-0 right-0 z-30 p-6 pb-10">
            <h3 className="text-white font-display font-bold text-3xl leading-tight mb-1">{active.name}</h3>
            <p className="text-white/80 text-sm mb-5">{active.desc}</p>
            <div className="flex gap-2 max-w-sm">
              <Link
                href="/#contacto"
                className="flex-1 text-center bg-electric hover:bg-electric-light text-white text-sm font-semibold rounded-full py-2.5 transition-colors"
              >
                Cotizar
              </Link>
              <Link
                href="/#servicios"
                className="flex-1 text-center bg-white hover:bg-white/90 text-[#0A2342] text-sm font-semibold rounded-full py-2.5 transition-colors"
              >
                Ver servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* desktop — static 4-column grid, no scroll-jack / story interaction */}
    <section className="hidden lg:block bg-white py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-5">
        {DIVISIONS.map((d) => (
          <div
            key={d.id}
            className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0A2342]"
          >
            <Image
              src={d.image}
              alt={d.alt}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/25" />

            <span className="absolute top-4 left-4 text-white/90 text-xs font-medium tracking-wide">
              {d.eyebrow}
            </span>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-white font-display font-bold text-2xl leading-tight mb-1">{d.name}</h3>
              <p className="text-white/80 text-sm mb-4">{d.desc}</p>
              <div className="flex gap-2">
                <Link
                  href="/#contacto"
                  className="flex-1 text-center bg-electric hover:bg-electric-light text-white text-sm font-semibold rounded-full py-2.5 transition-colors"
                >
                  Cotizar
                </Link>
                <Link
                  href="/#servicios"
                  className="flex-1 text-center bg-white hover:bg-white/90 text-[#0A2342] text-sm font-semibold rounded-full py-2.5 transition-colors"
                >
                  Ver servicio
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
