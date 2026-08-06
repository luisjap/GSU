import { Clock, ArrowRight } from 'lucide-react';

export default function QuickResponse() {
  return (
    <section className="bg-[#F5F7FA] py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-[#0A2342] px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row items-center gap-8">
        <div className="w-16 h-16 rounded-2xl bg-electric-soft flex items-center justify-center shrink-0">
          <Clock size={28} strokeWidth={1.75} className="text-electric-light" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
            Respuesta a propuestas técnicas en 24h
          </h2>
          <p className="mt-2 text-white/55 text-base leading-relaxed">
            Ante una falla operacional o una nueva instalación, evaluamos el alcance y te
            entregamos una propuesta técnica clara dentro de un día hábil.
          </p>
        </div>
        <a
          href="/contacto"
          className="shrink-0 inline-flex items-center gap-1.5 bg-electric hover:bg-electric-light text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
        >
          Contactar ahora
          <ArrowRight size={15} />
        </a>
      </div>
    </section>
  );
}
