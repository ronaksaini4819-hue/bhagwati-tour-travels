import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Places from "@/components/Places";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import CallButton from "@/components/CallButton";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Places />
      <WhyChooseUs />

      <WhatsappButton />
      <CallButton />

      <Footer />
    </>
  );
}