import { Header } from "@/components/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { WhyChooseSection } from "@/components/landing/WhyChooseSection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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
      <main className="relative pt-16">
        <HeroSection />
        <WhyChooseSection />
      </main>
    </div>
  );
};

export default Landing;