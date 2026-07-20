'use client';
import { AirVent, Wind, Wrench, Plug, Ruler, Plus } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/components/CartContext';
import { formatCLP } from '@/lib/format';

const ICONS = { ac: AirVent, wind: Wind, wrench: Wrench, plug: Plug, ruler: Ruler };

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const Icon = ICONS[product.icon];

  return (
    <div className="group flex flex-col rounded-2xl bg-white border border-black/[0.06] overflow-hidden hover:shadow-lg hover:shadow-black/[0.06] hover:-translate-y-0.5 transition-all duration-300">
      <div className="relative h-40 bg-[#f2f7f4] flex items-center justify-center">
        {product.featured && (
          <span className="absolute top-3 left-3 bg-leaf text-white text-[10px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full">
            Destacado
          </span>
        )}
        <Icon size={56} strokeWidth={1.25} className="text-leaf/70 group-hover:scale-110 transition-transform duration-300" />
      </div>
      <div className="flex flex-col flex-1 p-5 gap-2">
        <h3 className="font-display font-semibold text-[#10231a] text-base leading-snug line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[#5b6b62] text-sm leading-relaxed line-clamp-2">{product.description}</p>
        <div className="mt-auto pt-3 flex items-center justify-between gap-3">
          <span className="font-mono font-semibold text-lg text-[#10231a] tabular-nums">
            {formatCLP(product.price)}
          </span>
          <button
            onClick={() => addItem({ id: product.id, name: product.name, price: product.price })}
            className="flex items-center gap-1.5 bg-leaf hover:bg-leaf-light text-white text-sm font-semibold px-3.5 py-2 rounded-full transition-colors"
          >
            <Plus size={15} strokeWidth={2.5} />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}
