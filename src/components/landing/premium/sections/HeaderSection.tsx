import { Badge } from "@/components/ui/badge";
import { Gift } from "lucide-react";

export const HeaderSection = () => {
  return (
    <div className="text-center mb-12 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
        Construisez l'avenir avec SubaCentral !
      </h2>
      <div className="flex flex-col items-center gap-2 mb-3">
        <p className="text-lg md:text-xl font-semibold text-gray-800">
          Soutenez aujourd'hui, profitez demain.
        </p>
        <Badge 
          variant="secondary" 
          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1 text-sm"
        >
          <Gift className="w-4 h-4 mr-1 inline-block" />
          1.67€/mois
        </Badge>
      </div>
      <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
        Rejoignez notre campagne de crowdfunding et accédez aux fonctionnalités Premium 
        dès que l'objectif sera atteint.
      </p>
    </div>
  );
};