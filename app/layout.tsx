import type { Metadata } from 'next';
import { Montserrat, Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const BASE_URL = 'https://gsu.cl';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

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
    images: ['/images/library/hero-fachada-corporativa.webp'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GSU Ingeniería y Mantenimiento',
    description: 'Ingeniería aplicada a la continuidad operacional.',
    images: ['/images/library/hero-fachada-corporativa.webp'],
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
    <html lang="es" className={`${montserrat.variable} ${inter.variable} ${robotoMono.variable}`}>
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
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
