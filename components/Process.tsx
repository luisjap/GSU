const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico y propuesta técnica',
    desc: 'Evaluamos el proyecto y entregamos una propuesta técnica clara, con mano de obra y materiales desglosados por separado.',
    image: 'proceso-diagnostico',
  },
  {
    n: '02',
    title: 'Aceptación y orden de trabajo',
    desc: 'Aceptas la propuesta y cubres el anticipo — con eso reservamos al técnico especialista y los materiales.',
    image: 'proceso-propuesta',
  },
  {
    n: '03',
    title: 'Ejecución certificada',
    desc: 'El técnico especialista ejecuta el proyecto en la fecha acordada, con los materiales ya listos.',
    image: 'proceso-trabajo',
  },
  {
    n: '04',
    title: 'Informe técnico y garantía',
    desc: 'Verificamos el resultado contigo, entregamos un informe técnico y respaldamos el proyecto entregado bajo garantía.',
    image: 'proceso-entrega',
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-[#E8ECEF] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-brand text-sm font-semibold tracking-widest uppercase">Cómo trabajamos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342]">
            De la propuesta técnica<br />al proyecto entregado, en 4 pasos
          </h2>
          <p className="mt-4 text-[#4B4F54] text-base leading-relaxed">
            Un proceso transparente: sabes qué pagas, cuándo, y quién responde por el resultado.
          </p>
        </div>

        <div className="relative">
          {/* connector line desktop */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="group relative flex flex-col items-center text-center">
                {/* step photo */}
                <div className="relative w-20 h-20 rounded-full overflow-hidden mb-6 border border-black/[0.07] shadow-sm group-hover:border-brand/30 group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={`/images/library/${s.image}.webp`}
                    alt={s.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand text-white text-[10px] font-bold flex items-center justify-center font-display font-mono ring-2 ring-[#E8ECEF]">
                    {s.n.slice(1)}
                  </span>
                </div>

                <h3 className="text-[#0A2342] font-display font-semibold text-lg mb-2 group-hover:text-gradient transition-all">
                  {s.title}
                </h3>
                <p className="text-[#4B4F54] text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
