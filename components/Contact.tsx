'use client';
import { useState } from 'react';
import { Button, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@relume_io/relume-ui';

const SERVICES = [
  'Desarrollo Web',
  'E-commerce',
  'Automatización & AI',
  'CRM / Sistema a medida',
  'SaaS',
  'Deploy & DevOps',
  'Otro',
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
    <section id="contacto" className="bg-[#0b1220] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* left */}
        <div>
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">Contacto</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Hablemos de tu<br />próximo proyecto
          </h2>
          <p className="mt-4 text-white/45 text-base leading-relaxed max-w-sm">
            Cuéntanos qué necesitas. Te respondemos en menos de 24 horas con una propuesta inicial.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            {[
              { icon: '📧', label: 'Email', value: 'contacto@lu.dev' },
              { icon: '💬', label: 'WhatsApp', value: '+56 9 1234 5678' },
              { icon: '📍', label: 'Ubicación', value: 'Santiago, Chile · Remoto' },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-lg shrink-0">
                  {c.icon}
                </div>
                <div>
                  <div className="text-white/30 text-xs font-medium uppercase tracking-wide">{c.label}</div>
                  <div className="text-white/70 text-sm font-medium">{c.value}</div>
                </div>
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
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
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
                className="bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 rounded-xl focus:border-emerald-500/50 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-white/40 text-xs font-medium uppercase tracking-wide">Servicio</label>
            <Select onValueChange={(v) => setForm({ ...form, service: v })}>
              <SelectTrigger className="bg-white/[0.04] border-white/[0.08] text-white/60 rounded-xl">
                <SelectValue placeholder="¿Qué necesitas?" />
              </SelectTrigger>
              <SelectContent className="bg-[#111827] border-white/10">
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
              placeholder="Cuéntame sobre tu proyecto…"
              className="w-full bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/20 rounded-xl px-4 py-3 text-sm resize-none outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-[#0b1220] font-semibold py-3.5 rounded-xl text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-400/30 transition-all"
          >
            {status === 'sending' ? 'Enviando…' : 'Enviar mensaje →'}
          </Button>

          {status === 'ok' && (
            <p className="text-center text-emerald-400 text-sm font-medium">
              ✓ Mensaje recibido. Te respondemos en menos de 24 horas.
            </p>
          )}
          {status === 'err' && (
            <p className="text-center text-red-400 text-sm">
              Ocurrió un error. Escríbenos directamente a contacto@lu.dev
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
