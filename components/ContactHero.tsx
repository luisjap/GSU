import Image from 'next/image';

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-night py-28 px-4 sm:px-6 text-center">
      <Image
        src="/images/library/hero-fachada-corporativa.webp"
        alt="Fachada corporativa GSU"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/90 via-brand-dark/80 to-night/95" />

      <div className="relative max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-display font-bold text-white leading-tight">Contacto</h1>
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-electric" />
          ))}
        </div>
        <p className="mt-6 text-white/75 text-base sm:text-lg leading-relaxed">
          ¿Necesitas un especialista? Escríbenos o llámanos y te ayudamos a resolverlo.
        </p>
      </div>
    </section>
  );
}
