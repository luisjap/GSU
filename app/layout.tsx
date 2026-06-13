import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lu.dev — Soluciones Tecnológicas',
  description: 'Desarrollamos plataformas web, e-commerce y sistemas a medida. De la idea a producción.',
  openGraph: {
    type: 'website',
    title: 'Lu.dev — Soluciones Tecnológicas',
    description: 'Plataformas web, e-commerce y sistemas a medida. Cotiza tu proyecto.',
    locale: 'es_CL',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
