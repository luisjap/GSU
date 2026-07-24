import Image from 'next/image';

const EXAMPLES = [
  { before: 'caso-electrico-antes', after: 'caso-electrico-despues', label: 'Tablero eléctrico' },
  { before: 'caso-hvac-antes', after: 'caso-hvac-despues', label: 'Climatización' },
  { before: 'caso-bombas-antes', after: 'caso-bombas-despues', label: 'Sala de bombas' },
  { before: 'caso-hidraulico-antes', after: 'caso-hidraulico-despues', label: 'Red hidráulica' },
];

export default function Gallery() {
  return (
    <section className="bg-white py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 max-w-2xl">
          <span className="text-electric text-sm font-semibold tracking-widest uppercase">Ejemplos de trabajo</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-bold text-[#0A2342] leading-tight">
            El tipo de resultado que entregamos
          </h2>
        </div>
        <p className="text-[#4B4F54] text-sm mb-12 max-w-2xl">
          Escenas ilustrativas del estándar de orden y terminación que aplicamos — no corresponden
          a un proyecto de cliente específico.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {EXAMPLES.map((ex) => (
            <div key={ex.label}>
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden">
                <div className="relative aspect-square">
                  <Image
                    src={`/images/library/${ex.before}.webp`}
                    alt={`${ex.label} — antes`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full">
                    Antes
                  </span>
                </div>
                <div className="relative aspect-square">
                  <Image
                    src={`/images/library/${ex.after}.webp`}
                    alt={`${ex.label} — después`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-electric text-white text-[10px] font-semibold uppercase tracking-wide px-2 py-1 rounded-full">
                    Después
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[#0A2342] font-medium text-sm">{ex.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
