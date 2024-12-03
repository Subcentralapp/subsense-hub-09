import { motion } from "framer-motion";
import { BadgeCheck, Users, Gift, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PricingComparison } from "./PricingComparison";
import { FeatureGrid } from "./FeatureGrid";

const benefits = [
  {
    icon: <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />,
    title: "Conseil des supporters",
    description: "Participez aux décisions d'évolution",
  },
  {
    icon: <Crown className="w-5 h-5 text-primary flex-shrink-0 mt-1" />,
    title: "Avantages à vie",
    description: "Gardez votre statut premium",
  },
  {
    icon: <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-1" />,
    title: "Réductions exclusives",
    description: "Sur vos apps favorites",
  },
];

export const EarlySupporter = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 h-full hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Offre Early Supporter
        </CardTitle>
        <CardDescription>
          <div className="bg-primary/5 rounded-lg p-4 space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                {benefit.icon}
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-primary">{benefit.title}</span>
                  : {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <PricingComparison />
        <FeatureGrid />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center gap-2 pt-4"
        >
          <Badge variant="secondary" className="py-2 px-4 text-sm flex items-center gap-2 animate-pulse">
            <BadgeCheck className="w-4 h-4" />
            <span>Badge Early Supporter à vie</span>
          </Badge>
        </motion.div>
      </CardContent>
    </Card>
  );
};