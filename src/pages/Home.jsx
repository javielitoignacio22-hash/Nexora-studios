import Hero from "../components/sections/Hero";
import ServicePreview from "../components/sections/ServicePreview";
import PortafolioPreview from "../components/sections/PortafolioPreview";
import CTA from "../components/sections/CTA";

export default function Home() {
  return (
    <div className="bg-[#0B0F19] min-h-screen text-white">
      <Hero />
      <ServicePreview />
      <PortafolioPreview />
      <CTA />
    </div>
  );
}