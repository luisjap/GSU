import { Button } from '@relume_io/relume-ui';

export default function CtaBanner() {
  return (
    <section className="bg-[#0d1b2a] py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0c2e2c]/60 to-[#0c2140]/60 border border-[#22d3c4]/15 p-10 sm:p-16 text-center">
        {/* glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#22d3c4]/10 blur-3xl rounded-full pointer-events-none" />

        <span className="relative text-[#5fe6da] text-sm font-semibold tracking-widest uppercase">¿Necesitas mantención?</span>
        <h2 className="relative mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
          Coordina un técnico certificado<br className="hidden sm:block" /> sin vueltas
        </h2>
        <p className="relative mt-4 text-white/50 text-base sm:text-lg max-w-xl mx-auto">
          Cotización clara, anticipo transparente y garantía del trabajo. Cuéntanos qué necesitas.
        </p>

        <div className="relative mt-8 flex justify-center">
          <Button
            asChild
            className="bg-[#22d3c4] hover:bg-[#5fe6da] text-[#0a141f] font-semibold px-8 py-3.5 rounded-full text-base shadow-xl shadow-[#22d3c4]/25 hover:shadow-[#22d3c4]/35 transition-all"
          >
            <a href="#contacto">Solicitar cotización →</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
