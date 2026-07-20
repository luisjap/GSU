'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { formatCLP } from '@/lib/format';
import { Minus, Plus, Trash2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', comuna: '', notes: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [orderId, setOrderId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, total: totalPrice }),
      });
      const data = await res.json();
      if (res.ok) {
        setOrderId(data.orderId);
        setStatus('ok');
        clearCart();
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  };

  if (status === 'ok') {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center flex flex-col items-center gap-4 py-24">
          <CheckCircle2 size={48} className="text-leaf" strokeWidth={1.5} />
          <h1 className="font-display font-bold text-2xl text-[#10231a]">¡Pedido recibido!</h1>
          <p className="text-[#5b6b62] text-sm leading-relaxed">
            Tu número de pedido es <span className="font-mono font-semibold text-[#10231a]">{orderId}</span>.
            Te contactaremos por correo o teléfono en las próximas 24 horas hábiles para coordinar el pago y la entrega —
            todavía no procesamos pago en línea.
          </p>
          <Link href="/tienda" className="mt-2 text-leaf font-semibold text-sm hover:text-leaf-dark transition-colors">
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
          <p className="text-[#5b6b62]">Tu carrito está vacío.</p>
          <Link href="/tienda" className="text-leaf font-semibold text-sm hover:text-leaf-dark transition-colors">
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#f7faf8] min-h-screen py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/tienda" className="inline-flex items-center gap-1.5 text-[#5b6b62] hover:text-[#10231a] text-sm mb-8 transition-colors">
          <ArrowLeft size={15} />
          Volver a la tienda
        </Link>

        <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#10231a] mb-10">Confirmar pedido</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* order summary */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white border border-black/[0.06] rounded-2xl p-6 sticky top-24">
              <h2 className="font-display font-semibold text-lg text-[#10231a] mb-4">Tu pedido</h2>
              <div className="flex flex-col gap-4 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#10231a] leading-snug line-clamp-2">{item.name}</p>
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
                          className="ml-auto text-[#5b6b62] hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-[#10231a] tabular-nums shrink-0">
                      {formatCLP(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/[0.06] pt-4 flex items-center justify-between">
                <span className="text-[#5b6b62] text-sm">Total</span>
                <span className="font-mono font-bold text-xl text-[#10231a] tabular-nums">{formatCLP(totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="lg:col-span-3 order-1 lg:order-2 bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Nombre completo</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-[#f7faf8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#10231a] focus:outline-none focus:border-leaf/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-[#f7faf8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#10231a] focus:outline-none focus:border-leaf/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Teléfono</label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+56 9 ..."
                  className="bg-[#f7faf8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#10231a] focus:outline-none focus:border-leaf/50"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Comuna</label>
                <input
                  value={form.comuna}
                  onChange={(e) => setForm({ ...form, comuna: e.target.value })}
                  className="bg-[#f7faf8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#10231a] focus:outline-none focus:border-leaf/50"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Dirección (para instalación o despacho)</label>
              <input
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="bg-[#f7faf8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#10231a] focus:outline-none focus:border-leaf/50"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Notas (opcional)</label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="bg-[#f7faf8] border border-black/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-[#10231a] resize-none focus:outline-none focus:border-leaf/50"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-leaf hover:bg-leaf-light disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-base shadow-lg shadow-leaf/20 transition-all"
            >
              {status === 'sending' ? 'Enviando…' : 'Confirmar pedido'}
            </button>
            <p className="text-[11px] text-[#5b6b62] text-center leading-relaxed">
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
