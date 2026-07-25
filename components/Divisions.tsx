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

export default function Divisions() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll('[data-card]')) as HTMLElement[];
    const ratios = new Map<Element, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.intersectionRatio));
        let bestIdx = 0;
        let bestRatio = -1;
        cards.forEach((c, i) => {
          const r = ratios.get(c) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestIdx = i;
          }
        });
        setActive(bestIdx);
      },
      { root: el, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.children[i] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - 16, behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white pt-10 pb-6 sm:pt-14">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-6 pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {DIVISIONS.map((d) => (
          <div
            key={d.id}
            data-card
            className="group relative shrink-0 snap-start w-[82%] sm:w-[55%] lg:w-[27%] aspect-[3/4] rounded-2xl overflow-hidden bg-[#0A2342]"
          >
            <Image
              src={d.image}
              alt={d.alt}
              fill
              sizes="(max-width: 480px) 82vw, (max-width: 992px) 55vw, 27vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

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

      <div className="flex justify-center gap-2 mt-5" role="tablist" aria-label="Divisiones GSU">
        {DIVISIONS.map((d, i) => (
          <button
            key={d.id}
            role="tab"
            aria-selected={active === i}
            aria-label={`Ver ${d.name}`}
            onClick={() => scrollToCard(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === i ? 'w-6 bg-electric' : 'w-1.5 bg-black/15 hover:bg-black/25'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
