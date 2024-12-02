import { motion } from "framer-motion";
import { Heart, Star, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Votre soutien compte
          </h3>
          <p className="text-gray-600">
            Nous croyons en l'accès gratuit aux fonctionnalités essentielles. Votre soutien nous permet d'innover et d'améliorer l'expérience pour tous.
          </p>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => (
            <motion.div
              key={goal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 p-4 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors"
            >
              <div className="bg-white rounded-full p-2 shadow-sm">
                {goal.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};