const CAPACIDADES = [
  'Infraestructura Eléctrica', 'Climatización y Ventilación',
  'Mantenimiento Integral', 'Instalaciones técnicas', 'Mantención preventiva',
  'Mantención correctiva', 'Certificación SEC', 'Servicio a empresas', 'Servicio a domicilio',
  'Propuesta técnica transparente', 'Garantía del trabajo', 'Contratos de mantenimiento anual',
];

export default function Marquee() {
  const items = [...CAPACIDADES, ...CAPACIDADES];
  return (
    <div className="bg-white border-y border-black/[0.05] py-5 overflow-hidden">
      <div
        className="flex gap-10 w-max"
        style={{ animation: 'marquee 36s linear infinite' }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="text-[#4B4F54] text-sm font-medium tracking-wide whitespace-nowrap flex items-center gap-3"
          >
            <span className="w-1 h-1 rounded-full bg-brand/60 inline-block" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
