import { motion } from "framer-motion";
import { Rocket, Crown, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-primary" />,
    title: "Participez activement au développement",
    description: [
      "Rejoignez le Conseil des Supporters et façonnez l'application",
      "Proposez et votez sur les fonctionnalités futures qui comptent pour vous",
    ],
  },
  {
    icon: <Crown className="w-6 h-6 text-primary" />,
    title: "Débloquez des fonctionnalités exclusives",
    description: [
      "Ajout automatique d'abonnements et analyse des factures (OCR)",
      "Résiliation directe depuis l'app et gestion multi-comptes",
      "Réductions sur vos abonnements préférés et intégrations avancées",
    ],
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Bénéficiez d'un avantage unique et sans risque",
    description: [
      "Un badge exclusif Early Supporter pour marquer votre engagement",
      "Remboursement intégral garanti si l'objectif n'est pas atteint",
    ],
  },
];

export const FeaturesSection = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="h-full bg-white/80 backdrop-blur-sm border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="space-y-1 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  {feature.icon}
                </div>
                <CardTitle className="text-lg text-primary leading-tight">
                  {feature.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {feature.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="rounded-full w-1.5 h-1.5 bg-primary mt-2 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};