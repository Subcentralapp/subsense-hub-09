import { motion } from "framer-motion";
import { Bot, FileText, Users, Zap } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: "Automatisation IA",
    description: "Ajout et gestion automatique des abonnements via IA"
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Scan intelligent",
    description: "Extraction automatique des données de factures"
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Multi-comptes",
    description: "Gestion familiale et professionnelle des abonnements"
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "Intégrations",
    description: "Synchronisation avec vos outils préférés"
  }
];

export const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 bg-white rounded-lg shadow-sm"
        >
          <div className="bg-primary/10 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-3">
            {feature.icon}
          </div>
          <h3 className="font-semibold mb-1">{feature.title}</h3>
          <p className="text-sm text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};