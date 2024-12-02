import { motion } from "framer-motion";
import { Heart, Star, Rocket } from "lucide-react";

export const CampaignGoals = () => {
  const goals = [
    {
      icon: <Heart className="w-6 h-6 text-primary" />,
      title: "Fonctionnalités principales gratuites",
      description: "Profitez de toutes les fonctionnalités essentielles sans frais"
    },
    {
      icon: <Star className="w-6 h-6 text-primary" />,
      title: "Premium pour les supporters",
      description: "Accédez aux fonctionnalités avancées en nous soutenant"
    },
    {
      icon: <Rocket className="w-6 h-6 text-primary" />,
      title: "Innovation continue",
      description: "Aidez-nous à développer de nouvelles fonctionnalités"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Votre soutien compte
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous croyons en l'accès gratuit aux fonctionnalités essentielles. Votre soutien nous permet d'innover et d'améliorer l'expérience pour tous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 hover:bg-primary/5 transition-colors"
            >
              <div className="bg-white rounded-full p-3 shadow-sm w-fit mb-4">
                {goal.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{goal.title}</h3>
              <p className="text-gray-600">{goal.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};