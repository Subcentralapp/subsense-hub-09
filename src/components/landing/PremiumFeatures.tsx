import { motion } from "framer-motion";
import { Bot, FileText, Users, Zap, Shield, ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: <Bot className="w-10 h-10 text-primary" />,
    title: "Automatisation IA",
    description: "Ajout et gestion automatique des abonnements via IA"
  },
  {
    icon: <FileText className="w-10 h-10 text-primary" />,
    title: "Scan intelligent",
    description: "Extraction automatique des données de factures"
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Multi-comptes",
    description: "Gestion familiale et professionnelle des abonnements"
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: "Intégrations",
    description: "Synchronisation avec vos outils préférés"
  }
];

export const PremiumFeatures = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5" id="premium-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Devenez Early Supporter
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Proposition de valeur principale */}
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Offre Early Supporter Exclusive</CardTitle>
              <CardDescription>
                Accédez à toutes les fonctionnalités premium pendant 1 an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Prix normal</p>
                  <p className="text-xl font-semibold line-through">9.99€/mois</p>
                </div>
                <ArrowRight className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-gray-600">Offre Early Supporter</p>
                  <p className="text-3xl font-bold text-primary">19.99€/an</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-4 bg-white rounded-lg shadow-sm"
                  >
                    <div className="bg-primary/10 rounded-xl p-3 w-12 h-12 flex items-center justify-center mb-3">
                      {feature.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center justify-center gap-2 pt-4"
              >
                <Badge variant="secondary" className="py-2 px-4 text-sm flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Badge Early Supporter à vie</span>
                </Badge>
              </motion.div>
            </CardContent>
          </Card>

          {/* Garanties et assurances */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Nos garanties
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold mb-2">Satisfaction garantie</h4>
                <p className="text-sm text-gray-600">
                  Si nous n'atteignons pas notre objectif, vous serez intégralement remboursé
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold mb-2">Accès garanti</h4>
                <p className="text-sm text-gray-600">
                  L'accès gratuit reste disponible quoi qu'il arrive
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  const supportSection = document.getElementById('support-section');
                  supportSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full"
              >
                Devenir Early Supporter
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};