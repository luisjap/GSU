import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'GSU Servicios y Mantenimiento — Gasfitería, Electricidad y Climatización',
  description:
    'Instalación, mantención y reparación certificada en gasfitería, electricidad y climatización para empresas y hogares. Un solo proveedor, técnicos certificados.',
  openGraph: {
    type: 'website',
    title: 'GSU Servicios y Mantenimiento',
    description:
      'Gasfitería, electricidad y climatización certificada. Instalación, mantención y reparación para empresas y hogares.',
    locale: 'es_CL',
  },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <Nav />
          {children}
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
