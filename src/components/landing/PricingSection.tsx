import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "pour toujours",
    description: "Parfait pour débuter",
    features: [
      "Jusqu'à 5 abonnements",
      "Notifications de base",
      "Analyse simple des dépenses",
      "Support par email"
    ]
  },
  {
    name: "Pro",
    price: "4.99€",
    period: "par mois",
    description: "Pour les professionnels",
    popular: true,
    features: [
      "Abonnements illimités",
      "Notifications avancées",
      "Analyse détaillée et rapports",
      "Recommandations personnalisées",
      "Support prioritaire",
      "Export des données",
      "Intégration avec les outils pro"
    ]
  },
  {
    name: "Entreprise",
    price: "Sur mesure",
    period: "contactez-nous",
    description: "Pour les grandes équipes",
    features: [
      "Tout ce qui est inclus dans Pro",
      "Gestion multi-utilisateurs",
      "API dédiée",
      "Support dédié 24/7",
      "Formation personnalisée",
      "SLA garanti"
    ]
  }
];

export const PricingSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Des prix adaptés à vos besoins
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan qui correspond le mieux à vos besoins
            et commencez à optimiser vos dépenses dès aujourd'hui
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "bg-primary text-white shadow-xl scale-105"
                  : "bg-white text-gray-900 border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-secondary text-white text-sm font-medium px-4 py-1 rounded-full">
                    Le plus populaire
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-sm opacity-80">/{plan.period}</span>
                </div>
                <p className={plan.popular ? "text-white/80" : "text-gray-600"}>
                  {plan.description}
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${
                      plan.popular ? "text-white" : "text-primary"
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="lg"
                className={`w-full ${
                  plan.popular
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-primary text-white hover:bg-primary/90"
                }`}
                onClick={() => navigate("/auth")}
              >
                Commencer
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};