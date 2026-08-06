import Hero from '@/components/Hero';
import Divisions from '@/components/Divisions';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Products from '@/components/Products';
import QuickResponse from '@/components/QuickResponse';
import Stats from '@/components/Stats';
import Team from '@/components/Team';
import Gallery from '@/components/Gallery';
import Coverage from '@/components/Coverage';
import Process from '@/components/Process';
import CtaBanner from '@/components/CtaBanner';

export default function Home() {
  return (
    <main>
      <Hero />
      <Divisions />
      <Marquee />
      <Services />
      <Products />
      <QuickResponse />
      <Stats />
      <Team />
      <Gallery />
      <Coverage />
      <Process />
      <CtaBanner />
    </main>
  );
}
