import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: "🌟", text: "Interface intuitive pour gérer tous vos abonnements" },
  { icon: "📊", text: "Gratuit et illimité pour les fonctionnalités de base" },
  { icon: "💳", text: "Pas de carte bancaire requise - 1000 places gratuites" },
  { icon: "🎯", text: "Participez aux décisions d'évolution" },
  { icon: "👑", text: "Avantages premium exclusifs à vie" },
  { icon: "🔐", text: "Sécurité maximale de vos données" },
  { icon: "🚀", text: "Contribuez au développement de l'app" },
];

export const WhyChooseUs = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 flex-grow hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Pourquoi choisir SubaCentral ?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start gap-3"
          >
            <span className="text-lg flex-shrink-0">{feature.icon}</span>
            <p className="text-sm">{feature.text}</p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};