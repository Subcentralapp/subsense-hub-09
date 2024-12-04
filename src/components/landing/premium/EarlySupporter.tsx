import { motion } from "framer-motion";
import { Users, Rocket, Crown, Lock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export const EarlySupporter = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-50 py-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-3">
            Construisez l'avenir avec SubaCentral !
          </h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <p className="text-xl font-semibold text-gray-800">
              Soutenez aujourd'hui, profitez demain.
            </p>
            <Badge 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-3 py-1"
            >
              <Gift className="w-4 h-4 mr-1 inline-block" />
              1.67€/mois
            </Badge>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Rejoignez notre campagne de crowdfunding et accédez aux fonctionnalités Premium 
            dès que l'objectif sera atteint.
          </p>
        </motion.div>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>Devenez Early Supporter</span>
            <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};