'use client';
import { useEffect, useState } from 'react';
import { Button } from '@relume_io/relume-ui';

const LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
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
          ? 'bg-[#0b1220]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[#0b1220] font-display font-bold text-sm shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-400/40 transition-all">
            L
          </span>
          <span className="text-white font-display font-bold text-lg">
            Lu<span className="text-gradient">.dev</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === l.href.slice(1)
                  ? 'text-emerald-400 bg-emerald-400/10'
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
            className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] font-semibold text-sm px-5 py-2 rounded-full shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 transition-all"
          >
            <a href="#contacto">Cotizar proyecto</a>
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
        <div className="md:hidden bg-[#0b1220]/95 backdrop-blur-xl border-t border-white/[0.06] px-4 py-4 flex flex-col gap-2">
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
            className="mt-2 block text-center bg-emerald-500 text-[#0b1220] font-semibold py-2.5 rounded-full"
          >
            Cotizar proyecto
          </a>
        </div>
      )}
    </header>
  );
}
