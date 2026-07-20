'use client';
import { useEffect, useState } from 'react';
import { Button } from '@relume_io/relume-ui';

const LINKS = [
  { label: 'Especialidades', href: '#servicios' },
  { label: 'Cómo trabajamos', href: '#proceso' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      const sections = LINKS.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          return;
        }
      }
      setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a141f]/85 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span
            className="w-9 h-9 flex items-center justify-center text-[#0a141f] font-display font-bold text-[11px] tracking-tight bg-gradient-to-br from-[#5fe6da] to-[#22d3c4] shadow-lg shadow-[#22d3c4]/20 group-hover:shadow-[#22d3c4]/40 transition-all"
            style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
          >
            GSU
          </span>
          <span className="text-white font-display font-bold text-lg leading-none">
            <span className="text-gradient">GSU</span> Servicios y Mantenimiento
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === l.href.slice(1)
                  ? 'text-[#22d3c4] bg-[#22d3c4]/10'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            className="bg-[#22d3c4] hover:bg-[#5fe6da] text-[#0a141f] font-semibold text-sm px-5 py-2 rounded-full shadow-lg shadow-[#22d3c4]/20 hover:shadow-[#22d3c4]/30 transition-all"
          >
            <a href="#contacto">Solicitar cotización</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current mt-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current mt-1.5 transition-all ${open ? '-rotate-45 -translate-y-3' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a141f]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-4 flex flex-col gap-2">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white py-2 text-base font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-2 block text-center bg-[#22d3c4] text-[#0a141f] font-semibold py-2.5 rounded-full"
          >
            Solicitar cotización
          </a>
        </div>
      )}
    </header>
  );
}
