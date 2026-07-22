import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: 'GSU Ingeniería y Mantenimiento — Ingeniería aplicada a la continuidad operacional',
  description:
    'Ingeniería eléctrica, climatización y ventilación, sistemas hidráulicos y mantenimiento integral para empresas y hogares en Chile. Propuesta técnica clara, ejecución certificada y respaldo documental.',
  openGraph: {
    type: 'website',
    title: 'GSU Ingeniería y Mantenimiento',
    description:
      'Ingeniería eléctrica, climatización y ventilación, sistemas hidráulicos y mantenimiento integral. Soluciones técnicas que garantizan continuidad operacional.',
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
