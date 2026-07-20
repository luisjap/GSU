import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Products from '@/components/Products';
import Coverage from '@/components/Coverage';
import Process from '@/components/Process';
import CtaBanner from '@/components/CtaBanner';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Services />
      <Products />
      <Coverage />
      <Process />
      <CtaBanner />
      <Contact />
    </main>
  );
}
