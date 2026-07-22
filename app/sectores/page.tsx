import type { Metadata } from 'next';
import {
  Building2, Stethoscope, Home, HardHat, Briefcase, Factory,
  ShoppingBag, UtensilsCrossed, Coffee, User,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sectores — GSU Ingeniería y Mantenimiento',
  description:
    'Ingeniería eléctrica, climatización, sistemas hidráulicos y mantenimiento integral para hoteles, clínicas, hospitales, condominios, constructoras, industria y hogares en Chile.',
};

const EMPRESAS = [
  { icon: Building2, label: 'Hoteles' },
  { icon: Stethoscope, label: 'Clínicas' },
  { icon: Stethoscope, label: 'Hospitales' },
  { icon: Home, label: 'Condominios' },
  { icon: HardHat, label: 'Constructoras' },
  { icon: Briefcase, label: 'Oficinas' },
  { icon: Factory, label: 'Plantas industriales' },
  { icon: ShoppingBag, label: 'Centros comerciales' },
  { icon: UtensilsCrossed, label: 'Restaurantes' },
  { icon: Coffee, label: 'Cafeterías' },
];

export default function SectoresPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#E8ECEF] py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Sectores</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
            Infraestructura crítica<br />para empresas y hogares
          </h1>
          <p className="mt-6 text-[#4B4F54] text-lg leading-relaxed">
            Contratos de mantención mensual para edificios y empresas, o servicio puntual para el
            hogar — según lo que tu operación necesite.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <span className="text-brand text-xs font-semibold tracking-widest uppercase">Empresas</span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-[#0A2342]">
              Continuidad operacional para instalaciones críticas
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {EMPRESAS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center text-center gap-3 rounded-2xl bg-[#E8ECEF] border border-black/[0.05] p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center">
                  <s.icon size={20} strokeWidth={2} />
                </div>
                <span className="text-[#0A2342] text-sm font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#E8ECEF] py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center mx-auto mb-6">
            <User size={24} strokeWidth={2} className="text-brand" />
          </div>
          <span className="text-brand text-xs font-semibold tracking-widest uppercase">Clientes particulares</span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-display font-bold text-[#0A2342]">
            Propietarios que buscan un servicio profesional y formal
          </h2>
          <p className="mt-4 text-[#4B4F54] text-base leading-relaxed max-w-xl mx-auto">
            Para instalaciones, reparaciones o mantenimiento de sistemas esenciales del hogar —
            con la misma propuesta técnica clara y garantía del trabajo que ofrecemos a empresas.
          </p>
        </div>
      </section>
    </main>
  );
}
