import { ClipboardList, Wallet, Wrench, ShieldCheck } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Diagnóstico y cotización',
    desc: 'Evaluamos el trabajo y entregamos una cotización clara, con mano de obra y materiales desglosados por separado.',
    icon: ClipboardList,
  },
  {
    n: '02',
    title: 'Confirmación y anticipo',
    desc: 'Confirmas el trabajo y cubres el anticipo — con eso reservamos al técnico certificado y los materiales.',
    icon: Wallet,
  },
  {
    n: '03',
    title: 'Ejecución certificada',
    desc: 'El técnico especializado ejecuta el trabajo en la fecha acordada, con los materiales ya listos.',
    icon: Wrench,
  },
  {
    n: '04',
    title: 'Garantía y cierre',
    desc: 'Verificamos el resultado contigo y respondemos por el trabajo ejecutado bajo garantía.',
    icon: ShieldCheck,
  },
];

export default function Process() {
  return (
    <section id="proceso" className="bg-[#0a141f] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[#5fe6da] text-sm font-semibold tracking-widest uppercase">Cómo trabajamos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
            De la cotización al trabajo<br />terminado, en 4 pasos
          </h2>
          <p className="mt-4 text-white/45 text-base leading-relaxed">
            Un proceso transparente: sabes qué pagas, cuándo, y quién responde por el resultado.
          </p>
        </div>

        <div className="relative">
          {/* connector line desktop */}
          <div className="hidden lg:block absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px bg-gradient-to-r from-transparent via-[#22d3c4]/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s) => (
              <div key={s.n} className="group relative flex flex-col items-center text-center">
                {/* step circle */}
                <div className="relative w-20 h-20 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center mb-6 text-white/70
                  group-hover:bg-[#22d3c4]/10 group-hover:border-[#22d3c4]/30 group-hover:text-[#5fe6da] group-hover:shadow-xl group-hover:shadow-[#22d3c4]/10 transition-all duration-300">
                  <s.icon size={26} strokeWidth={1.75} />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#22d3c4] text-[#0a141f] text-[10px] font-bold flex items-center justify-center font-display font-mono">
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
