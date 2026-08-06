import { Phone, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/contact';

const CHANNELS = [
  {
    icon: Phone,
    title: 'Llámanos',
    desc: 'Atención directa para consultas y emergencias en horario hábil.',
    value: '+56 9 9850 1325',
    href: 'tel:+56998501325',
  },
  {
    icon: MessageCircle,
    title: 'Escríbenos',
    desc: 'Respuesta rápida por WhatsApp, todos los días de la semana.',
    value: 'Chatear por WhatsApp',
    href: whatsappLink(),
  },
];

export default function ContactChannels() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 border-b border-black/[0.06]">
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-black/[0.08]">
        {CHANNELS.map((c) => (
          <a
            key={c.title}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex flex-col items-center text-center gap-3 py-8 sm:py-2 px-6 hover:opacity-80 transition-opacity"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-soft flex items-center justify-center text-brand">
              <c.icon size={26} strokeWidth={2} />
            </div>
            <h3 className="text-[#0A2342] font-display font-bold text-lg tracking-wide uppercase">{c.title}</h3>
            <p className="text-[#4B4F54] text-sm leading-relaxed max-w-[220px]">{c.desc}</p>
            <span className="text-brand font-semibold text-base">{c.value}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
