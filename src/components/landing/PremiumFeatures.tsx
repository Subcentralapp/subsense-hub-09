import { motion } from "framer-motion";
import { Bot, FileText, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PremiumFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Bot className="w-10 h-10 text-primary" />,
      title: "Automatisation complète",
      description: "Ajoutez et gérez vos abonnements automatiquement"
    },
    {
      icon: <FileText className="w-10 h-10 text-primary" />,
      title: "OCR pour vos factures",
      description: "Scannez et enregistrez vos factures en un clic"
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Gestion des membres",
      description: "Créez des profils partagés pour les familles ou les entreprises"
    },
    {
      icon: <Zap className="w-10 h-10 text-primary" />,
      title: "Rappels et synchronisation",
      description: "Intégration avec Slack, Google Sheets, QuickBooks, etc."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Avec votre soutien, nous allons plus loin !
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            En participant à notre campagne de crowdfunding, vous aiderez à financer 
            le développement de fonctionnalités révolutionnaires qui seront débloquées 
            pour tous nos contributeurs.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
            >
              <div className="bg-primary/10 rounded-xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => {
              const premiumSection = document.getElementById('premium-features');
              premiumSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-lg px-8 py-6"
          >
            Soutenez le projet et débloquez toutes ces fonctionnalités !
          </Button>
        </motion.div>
      </div>
    </section>
  );
};