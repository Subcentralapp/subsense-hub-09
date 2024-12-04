import { motion } from "framer-motion";
import { BadgeCheck, Users, Rocket, Crown, Brain, Lock, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Participez aux décisions stratégiques",
    description: [
      "Rejoignez le Conseil des Supporters",
      "Influez sur l'évolution de l'application",
      "Proposez et votez sur les prochaines fonctionnalités",
    ],
  },
  {
    icon: <Rocket className="w-6 h-6 text-primary" />,
    title: "Fonctionnalités Premium débloquées",
    description: [
      "Ajout automatique d'abonnements",
      "Résiliation directe via l'application",
      "Analyse intelligente des factures avec OCR",
      "Gestion multi-comptes",
      "Intégrations avancées (API, Slack, etc.)",
    ],
  },
  {
    icon: <Crown className="w-6 h-6 text-primary" />,
    title: "Avantages exclusifs à vie",
    description: [
      "Badge unique Early Supporter",
      "Réductions permanentes sur vos abonnements préférés",
    ],
  },
  {
    icon: <Gift className="w-6 h-6 text-primary" />,
    title: "Accès Premium pendant 1 an",
    description: [
      "Accès exclusif Premium pendant un an à 19,99€",
      "Au lieu de 9,99€/mois",
    ],
  },
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Aucun risque pour vous",
    description: [
      "Remboursement intégral si objectif non atteint",
      "Accès gratuit aux fonctionnalités de base à vie",
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Offre Early Supporter : Participez à la Révolution SubaCentral !
          </h2>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Contribuez aujourd'hui, profitez demain !
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Devenez un acteur clé du développement de SubCentral et accédez aux fonctionnalités Premium 
            dès que notre campagne de crowdfunding atteindra son objectif.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-2 border-primary/10 hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl text-primary">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
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
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <span>Devenez Early Supporter</span>
            <Rocket className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-4 text-sm text-gray-600">
            Rejoignez l'aventure et contribuez à la réussite de SubCentral dès aujourd'hui.
          </p>
        </motion.div>
      </div>
    </div>
  );
};