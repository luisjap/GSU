'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/CartContext';

const LINKS = [
  { label: 'Especialidades', href: '/#servicios' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Cómo trabajamos', href: '/#proceso' },
  { label: 'Contacto', href: '/#contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/tienda?q=${encodeURIComponent(query.trim())}` : '/tienda');
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_2px_16px_rgba(16,35,26,0.08)]' : 'border-b border-black/[0.06]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span
            className="w-9 h-9 flex items-center justify-center text-white font-display font-bold text-[11px] tracking-tight bg-gradient-to-br from-leaf-light to-leaf shadow-sm"
            style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
          >
            GSU
          </span>
          <span className="hidden sm:block text-[#10231a] font-display font-bold text-lg leading-none">
            <span className="text-gradient">GSU</span> Servicios y Mantenimiento
          </span>
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5b6b62]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué productos estás buscando?"
              className="w-full bg-[#f2f7f4] border border-black/[0.06] rounded-full pl-10 pr-4 py-2 text-sm text-[#10231a] placeholder:text-[#5b6b62] focus:outline-none focus:border-leaf/40 focus:bg-white transition-colors"
            />
          </div>
        </form>

        <nav className="hidden lg:flex items-center gap-1 ml-auto">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#334a3d] hover:text-leaf hover:bg-leaf-soft transition-all duration-200"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={openCart}
          className="relative p-2 text-[#10231a] hover:text-leaf transition-colors ml-auto lg:ml-0"
          aria-label="Ver carrito"
        >
          <ShoppingCart size={22} strokeWidth={1.75} />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] min-w-[18px] px-1 rounded-full bg-leaf text-white text-[10px] font-bold flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>

        <button
          className="lg:hidden p-2 text-[#10231a]"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          <span className={`block w-5 h-0.5 bg-current transition-all ${open ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current mt-1.5 transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-current mt-1.5 transition-all ${open ? '-rotate-45 -translate-y-3' : ''}`} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-black/[0.06] px-4 py-4 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5b6b62]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué productos estás buscando?"
              className="w-full bg-[#f2f7f4] border border-black/[0.06] rounded-full pl-10 pr-4 py-2.5 text-sm text-[#10231a] placeholder:text-[#5b6b62] focus:outline-none focus:border-leaf/40"
            />
          </form>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-[#334a3d] hover:text-leaf py-1.5 text-base font-medium"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
