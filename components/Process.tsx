const STEPS = [
  {
    n: '01',
    title: 'Descubrimiento',
    desc: 'Analizamos tu negocio, objetivos y usuarios. Definimos el alcance, el stack técnico y el roadmap del proyecto.',
    icon: '🎯',
  },
  {
    n: '02',
    title: 'Diseño & Prototipo',
    desc: 'Wireframes, arquitectura de información y prototipo interactivo. Validamos antes de escribir una línea de código.',
    icon: '✏️',
  },
  {
    n: '03',
    title: 'Desarrollo Iterativo',
    desc: 'Sprints cortos con entregables reales. Deploy continuo para que veas el avance desde el primer día.',
    icon: '⚙️',
  },
  {
    n: '04',
    title: 'Launch & Soporte',
    desc: 'Deployment en producción, monitoreo, capacitación y soporte post-lanzamiento para asegurar el éxito.',
    icon: '🚀',
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-[#0b1220] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase">Proceso</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            De la idea al producto<br />en 4 pasos
          </h2>
          <p className="mt-4 text-white/45 text-base leading-relaxed">
            Un proceso ágil y transparente diseñado para minimizar riesgos y maximizar el valor entregado.
          </p>
        </div>

        <div className="relative">
          {/* connector line desktop */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="group relative flex flex-col items-center text-center">
                {/* step circle */}
                <div className="relative w-20 h-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 text-3xl
                  group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 group-hover:shadow-xl group-hover:shadow-emerald-500/10 transition-all duration-300">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-[#0b1220] text-[10px] font-bold flex items-center justify-center font-display">
                    {s.n.slice(1)}
                  </span>
                </div>

                <h3 className="text-white font-display font-semibold text-lg mb-2 group-hover:text-gradient transition-all">
                  {s.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
