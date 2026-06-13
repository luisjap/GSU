import { Button } from '@relume_io/relume-ui';

export default function CtaBanner() {
  return (
    <section className="bg-[#0d1526] py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/60 to-teal-950/60 border border-emerald-500/15 p-10 sm:p-16 text-center">
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

        <span className="relative text-emerald-400 text-sm font-semibold tracking-widest uppercase">¿Tienes un proyecto?</span>
        <h2 className="relative mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
          Llevemos tu idea a producción<br className="hidden sm:block" /> esta semana
        </h2>
        <p className="relative mt-4 text-white/50 text-base sm:text-lg max-w-xl mx-auto">
          Primera consultoría gratuita. Sin compromisos. Revisamos tu idea y te decimos exactamente qué necesitas.
        </p>

        <div className="relative mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-emerald-500 hover:bg-emerald-400 text-[#0b1220] font-semibold px-8 py-3.5 rounded-full text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-400/35 transition-all"
          >
            <a href="#contacto">Cotizar ahora →</a>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 hover:border-emerald-400/50 px-8 py-3.5 rounded-full text-base transition-all bg-transparent"
          >
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer">
              WhatsApp directo
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
