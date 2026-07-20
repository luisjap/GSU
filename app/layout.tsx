import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Servicios Integrales AL — Gasfitería, Electricidad y Climatización',
  description:
    'Instalación, mantención y reparación certificada en gasfitería, electricidad y climatización para empresas y hogares. Un solo proveedor, técnicos certificados.',
  openGraph: {
    type: 'website',
    title: 'Servicios Integrales AL',
    description:
      'Gasfitería, electricidad y climatización certificada. Instalación, mantención y reparación para empresas y hogares.',
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
