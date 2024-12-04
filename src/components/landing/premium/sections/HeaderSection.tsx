import { motion } from "framer-motion";
import { Gift } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const HeaderSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl font-bold text-primary mb-3">
        Construisez l'avenir avec SubaCentral !
      </h2>
      <div className="flex items-center justify-center gap-3 mb-3">
        <p className="text-xl font-semibold text-gray-800">
          Soutenez aujourd'hui, profitez demain.
        </p>
        <Badge 
          variant="secondary" 
          className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1"
        >
          <Gift className="w-4 h-4 mr-1 inline-block" />
          1.67€/mois
        </Badge>
      </div>
      <p className="text-base text-gray-600 max-w-2xl mx-auto">
        Rejoignez notre campagne de crowdfunding et accédez aux fonctionnalités Premium 
        dès que l'objectif sera atteint.
      </p>
    </motion.div>
  );
};