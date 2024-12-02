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
            Aidez-nous à construire l'application de gestion d'abonnements ultime !
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
          className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-8 max-w-3xl mx-auto text-center"
        >
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-700 mb-6">
              SubaCentral a été conçue pour répondre à un problème que nous connaissons tous : la gestion parfois chaotique de nos abonnements. Aujourd'hui, nous avons lancé un outil gratuit, simple et illimité, mais nous rêvons d'aller beaucoup plus loin.
            </p>
            
            <p className="text-gray-700 mb-6">
              Pour transformer cette vision en réalité, nous avons besoin de votre soutien.
              Vos contributions serviront directement à :
            </p>

            <ul className="text-left space-y-4 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-xl">💻</span>
                <span>Développer des fonctionnalités avancées comme l'ajout automatique d'abonnements grâce à l'IA et l'OCR pour les factures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">☁️</span>
                <span>Assurer l'hébergement et la sécurité des données, en utilisant les meilleurs serveurs pour une application rapide et fiable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-xl">🚀</span>
                <span>Améliorer l'expérience utilisateur, avec des intégrations avancées (Slack, Google Sheets) et des outils de notifications intelligentes.</span>
              </li>
            </ul>

            <p className="text-gray-700 mb-6">
              En soutenant notre projet, vous ne financez pas seulement une application : vous investissez dans une solution qui simplifie le quotidien de milliers d'utilisateurs.
            </p>

            <p className="text-gray-700 mb-8">
              En plus, tous nos early supporters recevront un accès Premium à vie, débloquant toutes les futures fonctionnalités sans frais supplémentaires.
            </p>

            <p className="font-semibold text-gray-900 mb-8">
              Ensemble, atteignons cet objectif et faisons de SubaCentral un outil incontournable !
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6"
          >
            Rejoignez l'aventure : Soutenez notre campagne dès aujourd'hui !
          </Button>
        </motion.div>
      </div>
    </section>
  );
};