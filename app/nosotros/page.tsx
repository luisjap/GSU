import type { Metadata } from 'next';
import { ShieldCheck, Wrench, Heart, TrendingUp, Award, Lightbulb } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Nosotros — GSU Ingeniería y Mantenimiento',
  description:
    'Ingeniería aplicada al funcionamiento continuo de las instalaciones. Conoce el propósito, la misión y los valores de GSU.',
};

const VALORES = [
  { icon: ShieldCheck, title: 'Profesionalismo', desc: 'Cada intervención se ejecuta conforme a procedimientos técnicos y buenas prácticas.' },
  { icon: Wrench, title: 'Seguridad', desc: 'La seguridad de nuestros clientes, colaboradores e instalaciones es prioritaria.' },
  { icon: Heart, title: 'Honestidad', desc: 'Las recomendaciones técnicas se basan en criterios profesionales y transparentes.' },
  { icon: Award, title: 'Confiabilidad', desc: 'Cumplimos los plazos, mantenemos nuestros compromisos y respaldamos nuestro trabajo.' },
  { icon: Lightbulb, title: 'Innovación', desc: 'Incorporamos nuevas tecnologías y metodologías para mejorar la eficiencia de nuestros servicios.' },
  { icon: TrendingUp, title: 'Calidad', desc: 'Buscamos resultados duraderos mediante materiales adecuados y mano de obra especializada.' },
];

export default function NosotrosPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#E8ECEF] py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Nosotros</span>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
            Ingeniería aplicada al funcionamiento<br />continuo de las instalaciones
          </h1>
          <p className="mt-6 text-[#4B4F54] text-lg leading-relaxed max-w-2xl mx-auto">
            GSU nace para responder a una necesidad que el mercado chileno aún presenta: empresas
            capaces de ofrecer soluciones técnicas integrales con estándares de ingeniería, rapidez
            operativa y una imagen profesional. En un mercado donde predominan servicios
            independientes o empresas enfocadas en una sola especialidad, GSU reúne electricidad,
            climatización y sistemas hidráulicos bajo una misma organización.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div>
            <span className="text-brand text-xs font-semibold tracking-widest uppercase">Propósito</span>
            <p className="mt-3 text-[#0A2342] text-lg leading-relaxed">
              Mantener operativos los espacios donde las personas viven, trabajan y producen,
              mediante soluciones técnicas confiables y ejecutadas con estándares de ingeniería.
            </p>
          </div>
          <div>
            <span className="text-brand text-xs font-semibold tracking-widest uppercase">Misión</span>
            <p className="mt-3 text-[#0A2342] text-lg leading-relaxed">
              Diseñar, instalar, reparar y mantener sistemas eléctricos, hidráulicos y de
              climatización, ofreciendo soluciones eficientes, seguras y duraderas para empresas y
              particulares.
            </p>
          </div>
          <div>
            <span className="text-brand text-xs font-semibold tracking-widest uppercase">Visión</span>
            <p className="mt-3 text-[#0A2342] text-lg leading-relaxed">
              Convertirnos en la empresa chilena referente en ingeniería aplicada al mantenimiento de
              infraestructura, destacándonos por nuestra excelencia técnica, innovación y compromiso
              con la continuidad operacional de nuestros clientes.
            </p>
          </div>
          <div>
            <span className="text-brand text-xs font-semibold tracking-widest uppercase">Qué somos</span>
            <p className="mt-3 text-[#0A2342] text-lg leading-relaxed">
              Una empresa especializada en ingeniería, mantenimiento e infraestructura técnica. No
              somos una empresa de "maestros" ni de reparaciones domésticas — somos una empresa
              técnica.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0A2342] py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-white/60 text-sm font-semibold tracking-widest uppercase">Manifiesto</span>
          <p className="mt-6 text-white text-xl sm:text-2xl leading-relaxed font-display">
            No creemos en las soluciones improvisadas. Creemos que cada instalación representa una
            responsabilidad. Cada sistema que mantenemos permite que un hogar continúe funcionando,
            que una clínica atienda pacientes, que un restaurante permanezca operativo o que una
            empresa no detenga su producción.
          </p>
          <p className="mt-6 text-white/80 text-base leading-relaxed">
            No solo realizamos mantenimiento. Garantizamos continuidad.
            No solo instalamos equipos. Construimos confianza.
            No solo solucionamos problemas. Protegemos la operación de nuestros clientes.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 max-w-2xl">
            <span className="text-brand text-sm font-semibold tracking-widest uppercase">Valores</span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-[#0A2342] leading-tight">
              Lo que rige cada intervención
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VALORES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-[#E8ECEF] border border-black/[0.05] p-6">
                <div className="w-11 h-11 rounded-xl bg-brand-soft text-brand flex items-center justify-center mb-5">
                  <v.icon size={20} strokeWidth={2} />
                </div>
                <h3 className="text-[#0A2342] font-display font-semibold text-base mb-2">{v.title}</h3>
                <p className="text-[#4B4F54] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
