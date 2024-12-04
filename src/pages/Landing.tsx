import { Header } from "@/components/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/features/FeaturesSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { EarlySupporter } from "@/components/landing/premium/EarlySupporter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative pt-16">
        <HeroSection />
        <FeaturesSection />
        <WhyChooseSection />
        <section id="support-section" className="py-16 bg-neutral-light">
          <div className="max-w-4xl mx-auto px-4">
            <EarlySupporter />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;