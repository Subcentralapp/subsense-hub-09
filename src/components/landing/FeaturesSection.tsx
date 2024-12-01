import { motion } from "framer-motion";
import { 
  BarChart, 
  Bell, 
  CreditCard, 
  PieChart, 
  Wallet, 
  Zap,
  Shield,
  TrendingUp
} from "lucide-react";

const features = [
  {
    icon: <BarChart className="w-8 h-8 text-primary" />,
    title: "Analyse Détaillée",
    description: "Visualisez vos dépenses avec des graphiques interactifs et des analyses en temps réel",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    icon: <Bell className="w-8 h-8 text-primary" />,
    title: "Alertes Intelligentes",
    description: "Recevez des notifications personnalisées pour vos échéances et renouvellements",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: <Wallet className="w-8 h-8 text-primary" />,
    title: "Gestion Budgétaire",
    description: "Définissez et suivez vos objectifs financiers avec notre outil de budgétisation",
    color: "from-pink-500/20 to-red-500/20"
  },
  {
    icon: <PieChart className="w-8 h-8 text-primary" />,
    title: "Catégorisation Auto",
    description: "Vos dépenses sont automatiquement classées pour une meilleure organisation",
    color: "from-orange-500/20 to-yellow-500/20"
  },
  {
    icon: <Shield className="w-8 h-8 text-primary" />,
    title: "Sécurité Maximale",
    description: "Vos données sont protégées avec les plus hauts standards de sécurité",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-primary" />,
    title: "Optimisation Continue",
    description: "Des recommandations personnalisées pour optimiser vos dépenses",
    color: "from-teal-500/20 to-cyan-500/20"
  }
];

export const FeaturesSection = () => {
  return (
    <div id="features" className="py-24 bg-neutral-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Une Suite Complète d'Outils
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Découvrez toutes les fonctionnalités qui font de SubaCentral
            la solution idéale pour gérer vos finances
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`
                absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color}
                transform group-hover:scale-105 transition-transform duration-300
              `} />
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
                <div className="bg-white rounded-xl p-3 w-16 h-16 flex items-center justify-center mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
    </div>
  );
};