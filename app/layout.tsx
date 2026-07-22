import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

const BASE_URL = 'https://gsu.cl';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'GSU Ingeniería y Mantenimiento — Ingeniería aplicada a la continuidad operacional',
    template: '%s',
  },
  description:
    'Ingeniería eléctrica, climatización y ventilación, sistemas hidráulicos y mantenimiento integral para empresas y hogares en Chile. Propuesta técnica clara, ejecución certificada y respaldo documental.',
  openGraph: {
    type: 'website',
    title: 'GSU Ingeniería y Mantenimiento',
    description:
      'Ingeniería eléctrica, climatización y ventilación, sistemas hidráulicos y mantenimiento integral. Soluciones técnicas que garantizan continuidad operacional.',
    locale: 'es_CL',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GSU Ingeniería y Mantenimiento',
    description: 'Ingeniería aplicada a la continuidad operacional.',
  },
  icons: { icon: '/favicon.svg' },
};

const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'GSU Ingeniería y Mantenimiento',
  description:
    'Ingeniería eléctrica, climatización y ventilación, sistemas hidráulicos y mantenimiento integral para empresas y hogares en Chile.',
  url: BASE_URL,
  areaServed: 'CL',
  address: { '@type': 'PostalAddress', addressCountry: 'CL' },
  slogan: 'Ingeniería aplicada a la continuidad operacional.',
  serviceType: [
    'Ingeniería Eléctrica',
    'Climatización y Ventilación',
    'Sistemas Hidráulicos',
    'Mantenimiento Integral',
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
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
