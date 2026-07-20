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
    <section id="contacto" className="bg-[#0a141f] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* left */}
        <div>
          <span className="text-[#5fe6da] text-sm font-semibold tracking-widest uppercase">Contacto</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Cuéntanos qué<br />necesitas mantener
          </h2>
          <p className="mt-4 text-white/45 text-base leading-relaxed max-w-sm">
            Describe el trabajo y la especialidad. Te respondemos con una cotización clara.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {NEXT_STEPS.map((s) => (
              <div key={s.text} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-[#22d3c4] shrink-0">
                  <s.icon size={18} strokeWidth={2} />
                </div>
                <div className="text-white/60 text-sm font-medium leading-snug">{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* right — form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 flex flex-col gap-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-white/40 text-xs font-medium uppercase tracking-wide">Nombre</label>
              <Input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus:border-[#22d3c4]/50 focus:ring-[#22d3c4]/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-white/40 text-xs font-medium uppercase tracking-wide">Email</label>
              <Input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus:border-[#22d3c4]/50 focus:ring-[#22d3c4]/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/40 text-xs font-medium uppercase tracking-wide">Especialidad</label>
            <Select onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-white/60 rounded-xl">
                <SelectValue placeholder="¿Qué necesitas?" />
              </SelectTrigger>
              <SelectContent className="bg-[#0f1f2e] border-white/10">
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s} className="text-white/70 hover:text-white focus:bg-white/5">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/40 text-xs font-medium uppercase tracking-wide">Mensaje</label>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Cuéntanos el problema o el trabajo que necesitas…"
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-[#22d3c4]/50 focus:ring-2 focus:ring-[#22d3c4]/20 transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-[#22d3c4] hover:bg-[#5fe6da] disabled:opacity-50 text-[#0a141f] font-semibold py-3.5 rounded-xl text-base shadow-lg shadow-[#22d3c4]/20 hover:shadow-[#22d3c4]/30 transition-all"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar solicitud →'}
          </Button>

          {status === 'ok' && (
            <p className="text-center text-[#5fe6da] text-sm font-medium">
              ✓ Solicitud recibida. Te respondemos dentro de 24 horas hábiles.
            </p>
          )}
          {status === 'err' && (
            <p className="text-center text-red-400 text-sm">
              Ocurrió un error al enviar. Intenta nuevamente en unos minutos.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
