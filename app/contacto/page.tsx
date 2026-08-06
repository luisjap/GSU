import type { Metadata } from 'next';
import ContactHero from '@/components/ContactHero';
import ContactChannels from '@/components/ContactChannels';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Contacto — GSU',
  description: 'Solicita tu propuesta técnica de infraestructura eléctrica, climatización y gasfitería. Te respondemos dentro de 24 horas hábiles.',
};

export default function ContactoPage() {
  return (
    <main>
      <ContactHero />
      <ContactChannels />
      <Contact />
    </main>
  );
}
