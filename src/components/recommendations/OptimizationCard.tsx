import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Recommendation } from "@/types/recommendation";

interface OptimizationCardProps {
  rec: Recommendation;
  onSelect: (rec: Recommendation) => void;
  currentPrice: number;
  alternativePrice: number;
}

export const OptimizationCard = ({ rec, onSelect, currentPrice, alternativePrice }: OptimizationCardProps) => {
  const savings = currentPrice - alternativePrice;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all hover:border-primary/20"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
            -{savings.toFixed(2)}€/mois
          </span>
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{rec.title}</h4>
          <p className="text-sm text-gray-500 mt-1">
            Passez de {currentPrice}€ à {alternativePrice}€ par mois
          </p>
        </div>
        <Button 
          variant="ghost" 
          className="w-full hover:bg-primary/10 hover:text-primary"
          onClick={() => onSelect(rec)}
        >
          Voir les détails
        </Button>
      </div>
    </motion.div>
  );
};