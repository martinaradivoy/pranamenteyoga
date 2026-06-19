export const dynamic = "force-dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Agenda from "@/components/Agenda";
import About from "@/components/About";
import Services from "@/components/Services";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />
        <Agenda />
        <About />
        <Services />
      </main>

      <Footer />
    </>
  );
}