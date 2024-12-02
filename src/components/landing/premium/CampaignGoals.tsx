import { motion } from "framer-motion";
import { Target, Rocket } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const campaignGoals = [
  {
    icon: <Target className="w-6 h-6 text-primary" />,
    title: "Développement IA",
    description: "Financement des modèles d'IA pour l'automatisation"
  },
  {
    icon: <Rocket className="w-6 h-6 text-primary" />,
    title: "Infrastructure",
    description: "Serveurs haute performance et sécurité"
  }
];

export const CampaignGoals = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Objectifs de la campagne</CardTitle>
        <CardDescription>
          Votre soutien finance directement :
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaignGoals.map((goal) => (
          <motion.div
            key={goal.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-3 p-3 bg-primary/5 rounded-lg"
          >
            <div className="bg-white rounded-full p-2">
              {goal.icon}
            </div>
            <div>
              <h4 className="font-semibold">{goal.title}</h4>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
};