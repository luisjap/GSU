import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes — GSU Ingeniería y Mantenimiento',
  description: 'Cómo funciona la propuesta técnica, la garantía, los contratos de mantención y el proceso de trabajo de GSU.',
};

const FAQS = [
  {
    q: '¿Cómo funciona el proceso, de la primera solicitud al proyecto entregado?',
    a: 'Evaluamos el proyecto y entregamos una propuesta técnica clara con mano de obra y materiales desglosados. Al aceptarla y cubrir el anticipo, generamos la orden de trabajo y coordinamos al técnico especialista. Tras la ejecución, entregamos un informe técnico y respaldamos el trabajo bajo garantía.',
  },
  {
    q: '¿Qué cubre la garantía del trabajo?',
    a: 'Respondemos por la ejecución técnica del servicio: si algo relacionado a la intervención realizada falla dentro del período de garantía, coordinamos la revisión y corrección sin costo adicional de mano de obra.',
  },
  {
    q: '¿Qué diferencia a GSU de contratar un técnico independiente?',
    a: 'Con GSU tratas con un solo proveedor para infraestructura eléctrica, climatización, gasfitería y mantenimiento integral, en vez de coordinar contratistas distintos. Cada intervención queda documentada y respaldada por la empresa, no por una persona individual.',
  },
  {
    q: '¿Cómo funcionan los contratos de mantención mensual (GSU Care)?',
    a: 'Incluyen mantención preventiva y correctiva, inspecciones y planificación anual, con visitas programadas según el plan acordado — pensados para edificios, empresas y administradores que necesitan continuidad operacional constante.',
  },
  {
    q: '¿Trabajan con empresas y particulares?',
    a: 'Sí. Ofrecemos contratos de mantención mensual para empresas y edificios, y servicio puntual con la misma propuesta técnica clara y garantía para clientes particulares.',
  },
  {
    q: '¿Los técnicos están certificados?',
    a: 'Los trabajos de electricidad y gas los ejecutan instaladores certificados ante la Superintendencia de Electricidad y Combustibles (SEC) cuando corresponde.',
  },
];

export default function FaqPage() {
  return (
    <main className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-14 text-center">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Preguntas frecuentes</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-[#0A2342] leading-tight">
            Todo lo que necesitas saber<br />antes de solicitar tu propuesta técnica
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl bg-[#E8ECEF] border border-black/[0.05] p-6 open:bg-white open:shadow-lg open:shadow-black/[0.05] transition-all"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-[#0A2342] font-display font-semibold text-base">
                {f.q}
                <span className="text-brand shrink-0 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
              </summary>
              <p className="mt-4 text-[#4B4F54] text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </main>
  );
}
