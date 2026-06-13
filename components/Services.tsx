'use client';
import { useRef } from 'react';

const SERVICES = [
  {
    icon: '⚡',
    title: 'Desarrollo Web & Apps',
    desc: 'Plataformas rápidas, escalables y modernas. Next.js, React, Node.js, APIs REST/GraphQL. Desde landing pages hasta sistemas complejos.',
    accent: '#0e9f6e',
    wide: true,
  },
  {
    icon: '🛒',
    title: 'E-commerce',
    desc: 'Tiendas online que convierten. Integraciones de pago, catálogos dinámicos, gestión de inventario y paneles de administración.',
    accent: '#6366f1',
    wide: false,
  },
  {
    icon: '🤖',
    title: 'Automatización & AI',
    desc: 'Workflows inteligentes, integración de APIs, bots y agentes IA para optimizar procesos de negocio.',
    accent: '#f59e0b',
    wide: false,
  },
  {
    icon: '📊',
    title: 'CRM & Sistemas a Medida',
    desc: 'Software de gestión personalizado para tu industria. CRMs, agendas, reportes y paneles en tiempo real.',
    accent: '#3b82f6',
    wide: false,
  },
  {
    icon: '📦',
    title: 'SaaS Multi-tenant',
    desc: 'Arquitecturas multi-inquilino con aislamiento de datos, planes de suscripción y onboarding automatizado.',
    accent: '#ec4899',
    wide: false,
  },
  {
    icon: '🚀',
    title: 'Deploy & DevOps',
    desc: 'CI/CD en Railway, Vercel o AWS. Monitoreo, escalado automático y mantenimiento continuo.',
    accent: '#14b8a6',
    wide: false,
  },
];

function ServiceCard({
  icon,
  title,
  desc,
  accent,
  wide,
}: (typeof SERVICES)[number]) {
  const barRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`group relative rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 overflow-hidden cursor-default
        hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300
        ${wide ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => {
        if (barRef.current) barRef.current.style.width = '100%';
      }}
      onMouseLeave={() => {
        if (barRef.current) barRef.current.style.width = '0%';
      }}
    >
      {/* accent bar */}
      <div
        ref={barRef}
        className="absolute top-0 left-0 h-[2px] transition-[width] duration-500 ease-out"
        style={{ width: '0%', background: accent }}
      />

      {/* glow */}
      <div
        className="absolute -top-16 -left-16 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ background: accent }}
      />

      <div
        className="text-3xl mb-4 inline-block transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
      >
        {icon}
      </div>
      <h3 className="text-white font-display font-semibold text-lg mb-2 group-hover:text-gradient transition-all">
        {title}
      </h3>
      <p className="text-white/45 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <section id="servicios" className="bg-[#0b1220] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">Servicios</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Todo lo que tu negocio<br />digital necesita
          </h2>
          <p className="mt-4 text-white/45 text-lg leading-relaxed">
            Un equipo completo para cada etapa del producto: diseño, desarrollo, deploy y evolución continua.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
