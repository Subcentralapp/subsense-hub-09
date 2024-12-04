import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";
import { HeaderSection } from "./sections/HeaderSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { SecuritySection } from "./sections/SecuritySection";
import { ConclusionSection } from "./sections/ConclusionSection";
import { FAQSection } from "./sections/FAQSection";

export const EarlySupporter = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-neutral-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <HeaderSection />
        <FeaturesSection />
        
        <div className="mt-8 md:mt-10 text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-full shadow-lg hover:shadow-xl transition-colors w-full sm:w-auto"
          >
            <span>Devenez Early Supporter</span>
            <Rocket className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <TestimonialsSection />
        <SecuritySection />
        <ConclusionSection />
        <FAQSection />
      </div>
    </div>
  );
};