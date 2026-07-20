const YEAR = new Date().getFullYear();

const LINKS = {
  Especialidades: [
    { label: 'Gasfitería', href: '#servicios' },
    { label: 'Electricidad', href: '#servicios' },
    { label: 'Climatización', href: '#servicios' },
    { label: 'Soluciones tecnológicas', href: '#servicios' },
  ],
  Empresa: [
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Cobertura y garantía', href: '#cobertura' },
    { label: 'Contacto', href: '#contacto' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#070d16] border-t border-white/[0.05] py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <span
                className="w-8 h-8 flex items-center justify-center text-[#0a141f] font-display font-bold text-[10px] tracking-tight bg-gradient-to-br from-[#5fe6da] to-[#22d3c4]"
                style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
              >
                GSU
              </span>
              <span className="text-white font-display font-bold text-lg">
                <span className="text-gradient">GSU</span> Servicios y Mantenimiento
              </span>
            </a>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Gasfitería, electricidad y climatización certificada — instalación, mantención y reparación para empresas y hogares.
            </p>
          </div>

          {/* links */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-4">{title}</h4>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-white/35 hover:text-white/70 text-sm transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-sm">© {YEAR} GSU Servicios y Mantenimiento — Todos los derechos reservados</p>
          <p className="text-white/15 text-sm">Chile</p>
        </div>
      </div>
    </footer>
  );
}
