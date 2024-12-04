import { Header } from "@/components/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/features/FeaturesSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative pt-16">
        <HeroSection />
        <FeaturesSection />
        <WhyChooseSection />
      </main>
    </div>
  );
};

export default Landing;