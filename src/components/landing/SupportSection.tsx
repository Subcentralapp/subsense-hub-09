import { motion } from "framer-motion";
import { Crown, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SupportSection = () => {
  const navigate = useNavigate();

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

  const features = [
    {
      emoji: "💻",
      title: "IA & OCR",
      description: "Ajout automatique d'abonnements via IA et scan de factures"
    },
    {
      emoji: "☁️",
      title: "Infrastructure Premium",
      description: "Serveurs haute performance et sécurité maximale"
    },
    {
      emoji: "🚀",
      title: "Intégrations Avancées",
      description: "Connexion avec Slack, Google Sheets et bien plus"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white to-primary/5" id="support-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-medium mb-4">
            Early Supporter
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Construisons ensemble l'avenir de la gestion d'abonnements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SubaCentral transforme la gestion chaotique des abonnements en une expérience simple et intuitive
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-primary/10 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Votre soutien compte
                </h3>
                <p className="text-gray-600">
                  Nous avons créé un outil gratuit et illimité, mais avec votre aide, 
                  nous pouvons aller encore plus loin.
                </p>
                
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <span className="text-2xl">{feature.emoji}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6">
                  <Button
                    size="lg"
                    onClick={() => navigate("/auth")}
                    className="w-full text-lg py-6 bg-primary hover:bg-primary/90"
                  >
                    Rejoignez l'aventure dès maintenant
                  </Button>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Accès Premium à vie pour tous les early supporters
                  </p>
                </div>
              </div>

              <div className="relative hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl" />
                <div className="relative p-8">
                  <blockquote className="text-lg text-gray-700 mb-6">
                    "En soutenant SubaCentral, vous investissez dans une solution qui simplifie 
                    le quotidien de milliers d'utilisateurs. Ensemble, créons l'outil de gestion 
                    d'abonnements dont nous avons toujours rêvé."
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-full" />
                    <div>
                      <div className="font-semibold">L'équipe SubaCentral</div>
                      <div className="text-sm text-gray-600">Passionnés par la simplicité</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};