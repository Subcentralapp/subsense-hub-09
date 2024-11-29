import { motion } from "framer-motion";
import { BarChart, Clock, Sparkles, Shield } from "lucide-react";

const features = [
  {
    icon: <BarChart className="w-6 h-6 text-primary" />,
    title: "Suivi Intelligent",
    description: "Visualisez et analysez vos dépenses d'abonnements en temps réel"
  },
  {
    icon: <Clock className="w-6 h-6 text-primary" />,
    title: "Rappels Automatiques",
    description: "Ne manquez plus jamais une date de renouvellement"
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "Recommandations Personnalisées",
    description: "Découvrez des opportunités d'économies adaptées à votre profil"
  },
  {
    icon: <Shield className="w-6 h-6 text-primary" />,
    title: "Sécurité Maximale",
    description: "Vos données sont cryptées et sécurisées"
  }
];

export const FeaturesSection = () => {
  return (
    <div id="features" className="py-20 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fonctionnalités Principales
          </h2>
          <p className="text-xl text-gray-600">
            Tout ce dont vous avez besoin pour une gestion efficace de vos abonnements
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};