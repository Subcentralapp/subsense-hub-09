import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const PricingComparison = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
      <div>
        <p className="text-sm text-gray-600">Prix normal</p>
        <p className="text-xl font-semibold line-through">9.99€/mois</p>
      </div>
      <ArrowRight className="w-6 h-6 text-primary" />
      <div>
        <p className="text-sm text-gray-600">Offre Early Supporter</p>
        <p className="text-3xl font-bold text-primary">19.99€/an</p>
      </div>
    </div>
  );
};