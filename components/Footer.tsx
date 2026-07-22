const YEAR = new Date().getFullYear();

const LINKS = {
  Servicios: [
    { label: 'Infraestructura Eléctrica', href: '/#servicios' },
    { label: 'Climatización y Ventilación', href: '/#servicios' },
    { label: 'Sistemas Hidráulicos', href: '/#servicios' },
    { label: 'Mantenimiento Integral', href: '/#servicios' },
  ],
  Empresa: [
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Sectores', href: '/sectores' },
    { label: 'Cómo trabajamos', href: '/#proceso' },
    { label: 'Cobertura y garantía', href: '/#cobertura' },
  ],
  Recursos: [
    { label: 'Tienda', href: '/tienda' },
    { label: 'Blog', href: '/blog' },
    { label: 'Preguntas frecuentes', href: '/faq' },
    { label: 'Contacto', href: '/#contacto' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#E8ECEF] border-t border-black/[0.05] py-16 px-4 sm:px-6 overflow-hidden">
      <img
        src="/images/library/textura-panel-electrico.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.05] pointer-events-none"
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* brand */}
          <div className="lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <span
                className="w-8 h-8 flex items-center justify-center text-white font-display font-bold text-[10px] tracking-tight bg-brand"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                GSU
              </span>
              <span className="text-[#0A2342] font-display font-bold text-lg">
                GSU <span className="font-medium">Ingeniería y Mantenimiento</span>
              </span>
            </a>
            <p className="text-[#4B4F54] text-sm leading-relaxed max-w-xs">
              Ingeniería aplicada a la continuidad operacional — infraestructura eléctrica, climatización, sistemas hidráulicos y mantenimiento integral para empresas y hogares.
            </p>
          </div>

          {/* links */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[#0A2342] text-xs font-semibold uppercase tracking-widest mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[#4B4F54] hover:text-brand text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/[0.05] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#4B4F54]/70 text-sm">© {YEAR} GSU Ingeniería y Mantenimiento — Todos los derechos reservados</p>
          <p className="text-[#4B4F54]/60 text-sm">Chile</p>
        </div>
      </div>
    </footer>
  );
}
