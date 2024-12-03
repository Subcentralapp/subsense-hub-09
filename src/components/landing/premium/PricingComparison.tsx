import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export const PricingComparison = () => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full max-w-md p-6 bg-primary/5 rounded-lg">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Prix normal</p>
          <p className="text-xl font-semibold line-through">9.99€/mois</p>
        </div>
        <ArrowRight className="w-6 h-6 text-primary mx-4" />
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Offre Early Supporter</p>
          <p className="text-4xl font-bold text-primary">19.99€</p>
          <p className="text-sm text-primary/80">accès à vie</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-primary/80">
        <Sparkles className="w-4 h-4" />
        <span>Offre limitée aux 1000 premiers inscrits</span>
      </div>
    </div>
  );
};