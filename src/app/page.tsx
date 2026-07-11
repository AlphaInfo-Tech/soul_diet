import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Included from "@/components/landing/Included";
import EventDetails from "@/components/landing/EventDetails";
import Pricing from "@/components/landing/Pricing";
import CtaFooter from "@/components/landing/CtaFooter";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="flex-1">
      <Header />
      <Hero />
      <Included />
      <EventDetails />
      <Pricing />
      <CtaFooter />
      <Footer />
    </main>
  );
}
