'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import { formatCLP } from '@/lib/format';

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice } = useCart();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart(); };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={closeCart} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-rise">
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.06]">
          <h2 className="font-display font-bold text-lg text-[#10231a]">Tu carrito</h2>
          <button onClick={closeCart} className="text-[#5b6b62] hover:text-[#10231a] transition-colors" aria-label="Cerrar carrito">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-[#5b6b62] px-6 text-center">
            <ShoppingBag size={40} strokeWidth={1.25} className="text-black/15" />
            <p className="text-sm">Tu carrito está vacío.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b border-black/[0.05] last:border-0">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#10231a] leading-snug line-clamp-2">{item.name}</h3>
                    <p className="font-mono text-sm text-[#5b6b62] mt-1 tabular-nums">{formatCLP(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-[#10231a] hover:bg-black/5 transition-colors"
                        aria-label="Restar"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="w-6 text-center text-sm font-mono tabular-nums">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full border border-black/10 flex items-center justify-center text-[#10231a] hover:bg-black/5 transition-colors"
                        aria-label="Sumar"
                      >
                        <Plus size={13} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-[#5b6b62] hover:text-red-600 transition-colors"
                        aria-label="Quitar del carrito"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 py-5 border-t border-black/[0.06] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[#5b6b62] text-sm">Subtotal</span>
                <span className="font-mono font-bold text-lg text-[#10231a] tabular-nums">{formatCLP(totalPrice)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full text-center bg-leaf hover:bg-leaf-light text-white font-semibold py-3.5 rounded-full transition-colors"
              >
                Ir a pagar
              </Link>
              <p className="text-[11px] text-[#5b6b62] text-center leading-relaxed">
                Aún no procesamos pago en línea — coordinamos el pago contigo al confirmar el pedido.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
