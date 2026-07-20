import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Products() {
  const preview = PRODUCTS.slice(0, 4);

  return (
    <section id="tienda" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-leaf text-sm font-semibold tracking-widest uppercase">Tienda</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#10231a] leading-tight">
              Nuestros equipos<br />y accesorios
            </h2>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-1.5 text-leaf font-semibold text-sm hover:text-leaf-dark transition-colors"
          >
            Ver toda la tienda
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {preview.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
