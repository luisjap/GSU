import { ShieldCheck, FileCheck2, BadgeCheck, Building2 } from 'lucide-react';

const POINTS = [
  {
    icon: ShieldCheck,
    title: 'Certificación SEC',
    desc: 'Los trabajos de electricidad y gas los ejecutan instaladores certificados ante la Superintendencia de Electricidad y Combustibles.',
  },
  {
    icon: FileCheck2,
    title: 'Anticipo transparente',
    desc: 'Cotización clara antes de empezar: sabes exactamente qué cubre el anticipo, qué el saldo y qué materiales incluye.',
  },
  {
    icon: BadgeCheck,
    title: 'Garantía del trabajo',
    desc: 'Respondemos por la ejecución técnica del servicio frente a ti — coordinamos y garantizamos, no solo derivamos.',
  },
  {
    icon: Building2,
    title: 'Empresas y hogares',
    desc: 'Contratos de mantención mensual para edificios y empresas, o servicio puntual para el hogar, según lo que necesites.',
  },
];

export default function Coverage() {
  return (
    <section id="cobertura" className="bg-[#0d1b2a] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <span className="text-[#5fe6da] text-sm font-semibold tracking-widest uppercase">Cobertura y garantía</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
            Trabajo certificado,<br />sin letra chica
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#22d3c4]/10 text-[#22d3c4] flex items-center justify-center mb-5">
                <p.icon size={20} strokeWidth={2} />
              </div>
              <h3 className="text-white font-display font-semibold text-base mb-2">{p.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
