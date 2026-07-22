'use client';
import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CATS: { value: 'todos' | 'equipos' | 'accesorios' | 'servicios'; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'equipos', label: 'Equipos' },
  { value: 'accesorios', label: 'Accesorios' },
  { value: 'servicios', label: 'Servicios' },
];

function TiendaContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [cat, setCat] = useState<(typeof CATS)[number]['value']>('todos');
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesCat = cat === 'todos' || p.category === cat;
      const matchesQuery = query.trim()
        ? p.name.toLowerCase().includes(query.trim().toLowerCase())
        : true;
      return matchesCat && matchesQuery;
    });
  }, [cat, query]);

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-10 max-w-2xl">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Tienda</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
            Equipos y accesorios de climatización
          </h1>
          <p className="mt-4 text-[#4B4F54] text-lg leading-relaxed">
            Catálogo de muestra — sujeto a stock y actualización de precios.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
          <div className="flex gap-2 bg-[#E8ECEF] border border-black/[0.05] rounded-full p-1 w-fit">
            {CATS.map((c) => (
              <button
                key={c.value}
                onClick={() => setCat(c.value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  cat === c.value ? 'bg-brand text-white shadow-sm' : 'text-[#4B4F54] hover:text-[#0A2342]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar producto…"
            className="sm:ml-auto w-full sm:w-64 bg-[#E8ECEF] border border-black/[0.05] rounded-full px-4 py-2 text-sm text-[#0A2342] placeholder:text-[#4B4F54] focus:outline-none focus:border-brand/40"
          />
        </div>

        {filtered.length === 0 ? (
          <p className="text-[#4B4F54] text-sm py-16 text-center">No encontramos productos con ese criterio.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default function TiendaPage() {
  return (
    <Suspense fallback={null}>
      <TiendaContent />
    </Suspense>
  );
}
