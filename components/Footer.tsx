const YEAR = new Date().getFullYear();

const LINKS = {
  Servicios: [
    { label: 'Desarrollo Web', href: '#servicios' },
    { label: 'E-commerce', href: '#servicios' },
    { label: 'Automatización', href: '#servicios' },
    { label: 'CRM a medida', href: '#servicios' },
  ],
  Empresa: [
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Proceso', href: '#proceso' },
    { label: 'Contacto', href: '#contacto' },
  ],
  Social: [
    { label: 'GitHub', href: 'https://github.com/luisjap' },
    { label: 'LinkedIn', href: '#' },
    { label: 'WhatsApp', href: 'https://wa.me/56912345678' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#080f1c] border-t border-white/[0.05] py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-[#0b1220] font-display font-bold text-sm">
                L
              </span>
              <span className="text-white font-display font-bold text-lg">
                Lu<span className="text-gradient">.dev</span>
              </span>
            </a>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs">
              Soluciones tecnológicas para negocios que quieren crecer sin límites.
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
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
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
          <p className="text-white/20 text-sm">© {YEAR} Lu.dev — Todos los derechos reservados</p>
          <p className="text-white/15 text-sm">Santiago, Chile · Operamos en remoto</p>
        </div>
      </div>
    </footer>
  );
}
