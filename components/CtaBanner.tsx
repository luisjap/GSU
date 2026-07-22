import Image from 'next/image';
import { Button } from '@relume_io/relume-ui';

export default function CtaBanner() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto relative overflow-hidden rounded-3xl border border-brand/15 p-10 sm:p-16 text-center">
        <Image
          src="/images/library/banner-equipo.webp"
          alt="Equipo técnico de GSU"
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/75 to-brand-dark/85" />

        <span className="relative text-white/80 text-sm font-semibold tracking-widest uppercase">¿Necesitas mantención?</span>
        <h2 className="relative mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-tight">
          Ingeniería aplicada a<br className="hidden sm:block" /> la continuidad operacional
        </h2>
        <p className="relative mt-4 text-white/85 text-base sm:text-lg max-w-xl mx-auto">
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
