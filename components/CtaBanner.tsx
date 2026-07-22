import { Button } from '@relume_io/relume-ui';

export default function CtaBanner() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-brand-soft border border-brand/15 p-10 sm:p-16 text-center">
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-brand/10 blur-3xl rounded-full pointer-events-none" />

        <span className="relative text-brand-dark text-sm font-semibold tracking-widest uppercase">¿Necesitas mantención?</span>
        <h2 className="relative mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#0A2342] leading-tight">
          Ingeniería aplicada a<br className="hidden sm:block" /> la continuidad operacional
        </h2>
        <p className="relative mt-4 text-[#4B4F54] text-base sm:text-lg max-w-xl mx-auto">
          Propuesta técnica clara, ejecución certificada y garantía del trabajo. Cuéntanos qué necesita tu infraestructura.
        </p>

        <div className="relative mt-8 flex justify-center">
          <Button
            asChild
            className="bg-brand hover:bg-brand-light text-white font-semibold px-8 py-3.5 rounded-full text-base shadow-lg shadow-brand/20 transition-all"
          >
            <a href="/#contacto">Solicitar propuesta técnica →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
