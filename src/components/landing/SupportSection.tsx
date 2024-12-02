import { motion } from "framer-motion";
import { Crown, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

export const SupportSection = () => {
  const navigate = useNavigate();
  const campaignProgress = 70; // Example progress

  const benefits = [
    {
      icon: <Crown className="w-8 h-8 text-primary" />,
      title: "Abonnement Premium à vie",
      description: "Accès à toutes les fonctionnalités premium dès leur sortie, sans frais supplémentaires"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Impact direct",
      description: "Chaque contribution nous aide à développer des outils qui simplifient votre quotidien"
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: "Exclusivité",
      description: "Soyez parmi les premiers à tester et façonner les fonctionnalités premium"
    }
  ];

  return (
    <section className="py-24 bg-white" id="support-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Soutenir, c'est participer au futur de la gestion d'abonnements !
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary/10 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 max-w-2xl mx-auto text-center"
        >
          <h3 className="text-2xl font-bold mb-6">Progression de la campagne</h3>
          <Progress value={campaignProgress} className="h-4 mb-4" />
          <p className="text-lg font-semibold text-primary mb-8">
            {campaignProgress}% de l'objectif atteint !
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6"
          >
            Participer maintenant
          </Button>
        </motion.div>
      </div>
    </section>
  );
};