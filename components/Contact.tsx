'use client';
import { useState } from 'react';
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@relume_io/relume-ui';
import { ClipboardCheck, Clock, FileText } from 'lucide-react';

const SERVICES = [
  'Gasfitería',
  'Electricidad',
  'Climatización',
  'Contrato de mantención mensual (empresas)',
  'Soluciones tecnológicas',
  'Otro',
];

const NEXT_STEPS = [
  { icon: Clock, text: 'Respondemos tu solicitud dentro de 24 horas hábiles.' },
  { icon: FileText, text: 'Cotización con mano de obra y materiales desglosados.' },
  { icon: ClipboardCheck, text: 'Sin compromiso: revisamos el alcance antes de agendar.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', service: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('ok');
        setForm({ name: '', email: '', message: '', service: '' });
      } else {
        setStatus('err');
      }
    } catch {
      setStatus('err');
    }
  };

  return (
    <section id="contacto" className="bg-[#f2f7f4] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* left */}
        <div>
          <span className="text-leaf text-sm font-semibold tracking-widest uppercase">Contacto</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#10231a] leading-tight">
            Cuéntanos qué<br />necesitas mantener
          </h2>
          <p className="mt-4 text-[#5b6b62] text-base leading-relaxed max-w-sm">
            Describe el trabajo y la especialidad. Te respondemos con una cotización clara.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {NEXT_STEPS.map((s) => (
              <div key={s.text} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.06] flex items-center justify-center text-leaf shrink-0">
                  <s.icon size={18} strokeWidth={2} />
                </div>
                <div className="text-[#334a3d] text-sm font-medium leading-snug">{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-black/[0.06] rounded-2xl p-8 flex flex-col gap-5 shadow-sm"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Nombre</label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre"
                className="bg-[#f7faf8] border-black/[0.08] text-[#10231a] placeholder:text-[#5b6b62]/60 rounded-xl focus:border-leaf/50 focus:ring-leaf/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Email</label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
                className="bg-[#f7faf8] border-black/[0.08] text-[#10231a] placeholder:text-[#5b6b62]/60 rounded-xl focus:border-leaf/50 focus:ring-leaf/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Especialidad</label>
            <Select onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger className="bg-[#f7faf8] border-black/[0.08] text-[#334a3d] rounded-xl">
                <SelectValue placeholder="¿Qué necesitas?" />
              </SelectTrigger>
              <SelectContent className="bg-white border-black/10">
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s} className="text-[#334a3d] hover:text-[#10231a] focus:bg-black/5">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#5b6b62] text-xs font-medium uppercase tracking-wide">Mensaje</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Cuéntanos el problema o el trabajo que necesitas…"
              className="w-full bg-[#f7faf8] border border-black/[0.08] text-[#10231a] placeholder:text-[#5b6b62]/60 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-leaf/50 focus:ring-2 focus:ring-leaf/20 transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-leaf hover:bg-leaf-light disabled:opacity-50 text-white font-semibold py-3.5 rounded-xl text-base shadow-lg shadow-leaf/20 transition-all"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar solicitud →'}
          </Button>

          {status === 'ok' && (
            <p className="text-center text-leaf-dark text-sm font-medium">
              ✓ Solicitud recibida. Te respondemos dentro de 24 horas hábiles.
            </p>
          )}
          {status === 'err' && (
            <p className="text-center text-red-600 text-sm">
              Ocurrió un error al enviar. Intenta nuevamente en unos minutos.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
