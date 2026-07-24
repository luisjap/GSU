import Image from 'next/image';

export default function Team() {
  return (
    <section className="bg-[#F5F7FA] py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1">
          <Image
            src="/images/library/nosotros-equipo.webp"
            alt="Equipo técnico de GSU Ingeniería y Mantenimiento"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <span className="text-electric text-sm font-semibold tracking-widest uppercase">Equipo profesional</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-[#0A2342] leading-tight">
            Técnicos certificados, no cuadrillas improvisadas
          </h2>
          <p className="mt-4 text-[#4B4F54] text-lg leading-relaxed">
            Cada especialidad de GSU la ejecuta un técnico certificado en su área — eléctrica,
            climatización o sistemas hidráulicos. Coordinamos el equipo completo bajo una misma
            organización, con estándares de seguridad y calidad consistentes en cada trabajo.
          </p>
        </div>
      </div>
    </section>
  );
}
