import Image from 'next/image';
import { ShieldCheck, FileCheck2, BadgeCheck, Building2 } from 'lucide-react';

const POINTS = [
  {
    icon: ShieldCheck,
    image: 'seguridad-checklist',
    title: 'Certificación SEC',
    desc: 'Los trabajos de electricidad y gas los ejecutan instaladores certificados ante la Superintendencia de Electricidad y Combustibles.',
  },
  {
    icon: FileCheck2,
    image: 'smart-reporte-digital',
    title: 'Propuesta técnica clara',
    desc: 'Antes de empezar sabes exactamente qué cubre el anticipo, qué el saldo y qué materiales incluye.',
  },
  {
    icon: BadgeCheck,
    image: 'premium-cableado',
    title: 'Garantía y respaldo documental',
    desc: 'Cada intervención queda documentada con informe técnico. Respondemos por el proyecto entregado, no solo derivamos.',
  },
  {
    icon: Building2,
    image: 'cliente-jefe-mantenimiento',
    title: 'Empresas y hogares',
    desc: 'Contratos de mantención mensual para edificios y empresas, o servicio puntual para el hogar, según lo que necesites.',
  },
];

export default function Coverage() {
  return (
    <section id="cobertura" className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-2xl">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Cobertura y garantía</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
            Trabajo certificado,<br />sin letra chica
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POINTS.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl bg-[#E8ECEF] border border-black/[0.05] overflow-hidden hover:bg-white hover:shadow-lg hover:shadow-black/[0.05] transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={`/images/library/${p.image}.webp`}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center mb-5">
                  <p.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="text-[#0A2342] font-display font-semibold text-base mb-2">{p.title}</h3>
                <p className="text-[#4B4F54] text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
