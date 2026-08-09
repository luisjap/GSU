'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ShoppingCart, Menu as MenuIcon } from 'lucide-react';
import { useCart } from '@/components/CartContext';

const LINKS = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Sectores', href: '/sectores' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contacto', href: '/contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  const isHome = pathname === '/';
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const NAV_HEIGHT = 64;
    const HYSTERESIS = 32;
    const HIDE_DELTA = 6;
    let ticking = false;
    let lastY = window.scrollY;
    let scrolledNow = false;

    const evaluate = () => {
      ticking = false;
      const currentY = window.scrollY;
      const heroEl = document.getElementById('hero');
      if (!heroEl) {
        scrolledNow = currentY > 24;
      } else {
        const bottom = heroEl.getBoundingClientRect().bottom;
        // hysteresis: switch to solid once the hero has fully passed under the
        // nav, and only switch back once it reappears with some margin — avoids
        // flicker from momentum/rubber-band scroll right at the boundary.
        scrolledNow = scrolledNow ? bottom < NAV_HEIGHT + HYSTERESIS : bottom <= NAV_HEIGHT;
      }
      setScrolled(scrolledNow);

      // past the hero: hide on scroll down, reveal on scroll up.
      const delta = currentY - lastY;
      if (!scrolledNow || currentY <= NAV_HEIGHT) {
        setHidden(false);
      } else if (delta > HIDE_DELTA) {
        setHidden(true);
      } else if (delta < -HIDE_DELTA) {
        setHidden(false);
      }
      lastY = currentY;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };

    evaluate();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/tienda?q=${encodeURIComponent(query.trim())}` : '/tienda');
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        hidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      } ${
        transparent
          ? 'bg-transparent border-b border-transparent'
          : scrolled
            ? 'bg-white shadow-[0_2px_16px_rgba(16,35,26,0.08)] border-b border-transparent'
            : 'bg-white border-b border-black/[0.06]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <Image
            src={transparent ? '/logo-gsu-white.png' : '/logo-gsu.png'}
            alt="GSU"
            width={785}
            height={210}
            priority
            className="h-7 sm:h-8 w-auto transition-opacity duration-300"
          />
          <span
            className={`hidden md:block font-display font-medium text-sm leading-none whitespace-nowrap transition-colors duration-300 ${
              transparent ? 'text-white/90' : 'text-graphite'
            }`}
          >
            Ingeniería y Mantenimiento
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search
              size={16}
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                transparent ? 'text-white/70' : 'text-graphite'
              }`}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué productos estás buscando?"
              className={`w-full rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none transition-colors duration-300 ${
                transparent
                  ? 'bg-white/15 border border-white/25 text-white placeholder:text-white/60 focus:bg-white/20'
                  : 'bg-[#E8ECEF] border border-black/[0.06] text-[#0A2342] placeholder:text-[#4B4F54] focus:border-brand/40 focus:bg-white'
              }`}
            />
          </div>
        </form>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                transparent
                  ? 'text-white hover:bg-white/10'
                  : 'text-[#0A2342] hover:text-brand hover:bg-brand-soft'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          className={`relative p-2 transition-colors ml-auto lg:ml-0 ${
            transparent ? 'text-white hover:text-white/80' : 'text-[#0A2342] hover:text-brand'
          }`}
          aria-label="Ver carrito"
        >
          <ShoppingCart size={22} strokeWidth={1.75} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] min-w-[18px] px-1 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        {/* desktop: collapsed icon that expands on hover to reveal the "Menú" label */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
          className={`hidden lg:flex group items-center h-10 min-w-[40px] w-10 hover:w-[108px] rounded-full border overflow-hidden transition-[width] duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            transparent
              ? 'bg-black/20 backdrop-blur-sm border-white/25 hover:bg-black/30'
              : 'bg-[#0A2342]/[0.04] border-black/10 hover:bg-[#0A2342]/[0.08]'
          }`}
        >
          <span className="w-10 h-10 min-w-[40px] shrink-0 flex items-center justify-center">
            <MenuIcon size={18} className={transparent ? 'text-white' : 'text-[#0A2342]'} />
          </span>
          <span
            className={`text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pr-4 ${
              transparent ? 'text-white' : 'text-[#0A2342]'
            }`}
          >
            {open ? 'Cerrar' : 'Menú'}
          </span>
        </button>

        <button
          className={`lg:hidden rounded-full px-4 py-1.5 text-sm font-medium border transition-colors duration-300 ${
            transparent
              ? 'bg-black/20 backdrop-blur-sm text-white border-white/25 hover:bg-black/30'
              : 'bg-[#0A2342]/[0.04] text-[#0A2342] border-black/10 hover:bg-[#0A2342]/[0.08]'
          }`}
          onClick={() => setOpen(!open)}
          aria-label="Menú"
          aria-expanded={open}
        >
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>

      {open && (
        <div className="bg-white border-t border-black/[0.06] px-4 py-4 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-graphite" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué productos estás buscando?"
              className="w-full bg-[#E8ECEF] border border-black/[0.06] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#0A2342] placeholder:text-[#4B4F54] focus:outline-none focus:border-brand/40"
            />
          </form>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#0A2342] hover:text-brand py-1.5 text-base font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
