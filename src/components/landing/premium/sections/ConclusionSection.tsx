import { ArrowRight, Gift, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ConclusionSection = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-20 text-center">
      <h3 className="text-3xl font-bold text-primary mb-8">
        Centralisez. Économisez. Simplifiez.
      </h3>
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2 text-lg">
          <Gift className="w-5 h-5 text-primary" />
          <span>Gratuit à vie pour les 1000 premiers inscrits</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Rocket className="w-5 h-5 text-primary" />
          <span>Accès Premium Early Supporter : 19,99€/an</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
        >
          Commencer gratuitement
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/auth")}
          className="text-lg px-8 py-6 border-2 hover:bg-primary/5"
        >
          Devenir Early Supporter
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};