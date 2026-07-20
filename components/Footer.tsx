const YEAR = new Date().getFullYear();

const LINKS = {
  Especialidades: [
    { label: 'Gasfitería', href: '/#servicios' },
    { label: 'Electricidad', href: '/#servicios' },
    { label: 'Climatización', href: '/#servicios' },
    { label: 'Soluciones tecnológicas', href: '/#servicios' },
  ],
  Empresa: [
    { label: 'Tienda', href: '/tienda' },
    { label: 'Cómo trabajamos', href: '/#proceso' },
    { label: 'Cobertura y garantía', href: '/#cobertura' },
    { label: 'Contacto', href: '/#contacto' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#f2f7f4] border-t border-black/[0.05] py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* brand */}
          <div>
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <span
                className="w-8 h-8 flex items-center justify-center text-white font-display font-bold text-[10px] tracking-tight bg-gradient-to-br from-leaf-light to-leaf"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                GSU
              </span>
              <span className="text-[#10231a] font-display font-bold text-lg">
                <span className="text-gradient">GSU</span> Servicios y Mantenimiento
              </span>
            </a>
            <p className="text-[#5b6b62] text-sm leading-relaxed max-w-xs">
              Gasfitería, electricidad y climatización certificada — instalación, mantención y reparación para empresas y hogares.
            </p>
          </div>

          {/* links */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-[#10231a] text-xs font-semibold uppercase tracking-widest mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[#5b6b62] hover:text-leaf text-sm transition-colors"
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
          <p className="text-[#5b6b62]/70 text-sm">© {YEAR} GSU Servicios y Mantenimiento — Todos los derechos reservados</p>
          <p className="text-[#5b6b62]/60 text-sm">Chile</p>
        </div>
      </div>
    </footer>
  );
}
