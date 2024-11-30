import { motion } from "framer-motion";
import { Shield, Zap, Award } from "lucide-react";

export const TrustIndicators = () => {
  const indicators = [
    {
      icon: <Shield className="h-8 w-8 text-primary mb-4" />,
      title: "Comparaison Objective",
      description: "Analyses détaillées basées sur des critères précis"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary mb-4" />,
      title: "Données à Jour",
      description: "Prix et fonctionnalités mis à jour quotidiennement"
    },
    {
      icon: <Award className="h-8 w-8 text-primary mb-4" />,
      title: "Meilleurs Prix",
      description: "Accès aux meilleures offres et réductions"
    }
  ];

  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      {indicators.map((indicator, index) => (
        <motion.div 
          key={index}
          className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {indicator.icon}
          <h3 className="font-semibold text-lg mb-2">{indicator.title}</h3>
          <p className="text-gray-600">{indicator.description}</p>
        </motion.div>
      ))}
    </div>
  );
};