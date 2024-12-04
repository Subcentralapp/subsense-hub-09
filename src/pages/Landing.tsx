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
        <EarlySupporter />
      </main>
    </div>
  );
};

export default Landing;