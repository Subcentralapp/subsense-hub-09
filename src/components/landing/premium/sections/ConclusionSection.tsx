import { ArrowRight, Gift, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ConclusionSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-16 md:mt-20 text-center px-4">
      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 md:mb-8">
        Centralisez. Économisez. Simplifiez.
      </h3>
      <div className="space-y-3 mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-2 text-base md:text-lg">
          <Gift className="w-5 h-5 text-primary flex-shrink-0" />
          <span>Gratuit à vie pour les 1000 premiers inscrits</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-base md:text-lg">
          <Rocket className="w-5 h-5 text-primary flex-shrink-0" />
          <span>Accès Premium Early Supporter : 19,99€/an</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 bg-primary hover:bg-primary/90 w-full sm:w-auto"
        >
          Commencer gratuitement
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/auth")}
          className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 border-2 hover:bg-primary/5 w-full sm:w-auto"
        >
          Devenir Early Supporter
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};