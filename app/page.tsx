import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Services from '@/components/Services';
import Coverage from '@/components/Coverage';
import Process from '@/components/Process';
import CtaBanner from '@/components/CtaBanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Coverage />
        <Process />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
