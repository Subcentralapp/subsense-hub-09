import { Header } from "@/components/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { MVPSection } from "@/components/landing/MVPSection";
import { PremiumFeatures } from "@/components/landing/PremiumFeatures";
import { SupportSection } from "@/components/landing/SupportSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { DetailedFeatures } from "@/components/landing/DetailedFeatures";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("User already authenticated, redirecting to dashboard");
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <HeroSection />
        <MVPSection />
        <PremiumFeatures />
        <SupportSection />
        <DetailedFeatures />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
      </main>
    </div>
  );
};

export default Landing;