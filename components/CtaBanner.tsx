import { Button } from '@relume_io/relume-ui';

export default function CtaBanner() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-leaf-soft to-frost/10 border border-leaf/15 p-10 sm:p-16 text-center">
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-leaf/10 blur-3xl rounded-full pointer-events-none" />

        <span className="relative text-leaf-dark text-sm font-semibold tracking-widest uppercase">¿Necesitas mantención?</span>
        <h2 className="relative mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-[#10231a] leading-tight">
          Coordina un técnico certificado<br className="hidden sm:block" /> sin vueltas
        </h2>
        <p className="relative mt-4 text-[#5b6b62] text-base sm:text-lg max-w-xl mx-auto">
          Cotización clara, anticipo transparente y garantía del trabajo. Cuéntanos qué necesitas.
        </p>

        <div className="relative mt-8 flex justify-center">
          <Button
            asChild
            className="bg-leaf hover:bg-leaf-light text-white font-semibold px-8 py-3.5 rounded-full text-base shadow-lg shadow-leaf/20 transition-all"
          >
            <a href="/#contacto">Solicitar cotización →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
