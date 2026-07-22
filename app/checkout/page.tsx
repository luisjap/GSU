'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { formatCLP } from '@/lib/format';
import { orderSchema, type OrderInput } from '@/lib/validation';
import { Minus, Plus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';

type OrderForm = Omit<OrderInput, 'items' | 'total'>;

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [orderId, setOrderId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema.omit({ items: true, total: true })),
  });

  const onSubmit = async (data: OrderForm) => {
    if (items.length === 0) return;
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, items, total: totalPrice }),
      });
      const resData = await res.json();
      if (!res.ok) throw new Error('request_failed');
      setOrderId(resData.orderId);
      setStatus('ok');
      clearCart();
    } catch {
      setStatus('err');
    }
  };

  if (status === 'ok') {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center flex flex-col items-center gap-4 py-24">
          <CheckCircle2 size={48} className="text-brand" strokeWidth={1.5} />
          <h1 className="font-display font-bold text-2xl text-[#0A2342]">¡Pedido recibido!</h1>
          <p className="text-[#4B4F54] text-sm leading-relaxed">
            Tu número de pedido es <span className="font-mono font-semibold text-[#0A2342]">{orderId}</span>.
            Te contactaremos por correo o teléfono en las próximas 24 horas hábiles para coordinar el pago y la entrega —
            todavía no procesamos pago en línea.
          </p>
          <Link href="/tienda" className="mt-2 text-brand font-semibold text-sm hover:text-brand-dark transition-colors">
            Volver a la tienda
          </Link>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-4 py-24">
          <p className="text-[#4B4F54]">Tu carrito está vacío.</p>
          <Link href="/tienda" className="text-brand font-semibold text-sm hover:text-brand-dark transition-colors">
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#E8ECEF] min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/tienda" className="inline-flex items-center gap-1.5 text-[#4B4F54] hover:text-[#0A2342] text-sm mb-8 transition-colors">
          <ArrowLeft size={15} />
          Volver a la tienda
        </Link>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#0A2342] mb-10">Confirmar pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* order summary */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-semibold text-lg text-[#0A2342] mb-4">Tu pedido</h2>
              <div className="flex flex-col gap-4 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0A2342] leading-snug line-clamp-2">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-mono tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-black/10 flex items-center justify-center hover:bg-black/5 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-[#4B4F54] hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-[#0A2342] tabular-nums shrink-0">
                      {formatCLP(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/[0.06] pt-4 flex items-center justify-between">
                <span className="text-[#4B4F54] text-sm">Total</span>
                <span className="font-mono font-bold text-xl text-[#0A2342] tabular-nums">{formatCLP(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="lg:col-span-3 order-1 lg:order-2 bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#4B4F54] text-xs font-medium uppercase tracking-wide">Nombre completo</label>
                <input
                  {...register('name')}
                  className="bg-[#E8ECEF] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0A2342] focus:outline-none focus:border-brand/50"
                />
                {errors.name && <p className="text-red-600 text-xs">{errors.name.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#4B4F54] text-xs font-medium uppercase tracking-wide">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  className="bg-[#E8ECEF] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0A2342] focus:outline-none focus:border-brand/50"
                />
                {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#4B4F54] text-xs font-medium uppercase tracking-wide">Teléfono</label>
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+56 9 ..."
                  className="bg-[#E8ECEF] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0A2342] focus:outline-none focus:border-brand/50"
                />
                {errors.phone && <p className="text-red-600 text-xs">{errors.phone.message}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#4B4F54] text-xs font-medium uppercase tracking-wide">Comuna</label>
                <input
                  {...register('comuna')}
                  className="bg-[#E8ECEF] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0A2342] focus:outline-none focus:border-brand/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#4B4F54] text-xs font-medium uppercase tracking-wide">Dirección (para instalación o despacho)</label>
              <input
                {...register('address')}
                className="bg-[#E8ECEF] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0A2342] focus:outline-none focus:border-brand/50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#4B4F54] text-xs font-medium uppercase tracking-wide">Notas (opcional)</label>
              <textarea
                {...register('notes')}
                rows={3}
                className="bg-[#E8ECEF] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#0A2342] resize-none focus:outline-none focus:border-brand/50"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand hover:bg-brand-light disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-base shadow-lg shadow-brand/20 transition-all"
            >
              {isSubmitting ? 'Enviando…' : 'Confirmar pedido'}
            </button>
            <p className="text-[11px] text-[#4B4F54] text-center leading-relaxed">
              Aún no procesamos pago en línea — te contactamos para coordinar el pago y la entrega o instalación.
            </p>
            {status === 'err' && (
              <p className="text-center text-red-600 text-sm">Ocurrió un error al enviar. Intenta nuevamente.</p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
