import { motion } from "framer-motion";
import { BadgeCheck, Sparkles, Users, Gift, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PricingComparison } from "./premium/PricingComparison";
import { FeatureGrid } from "./premium/FeatureGrid";
import { Guarantees } from "./premium/Guarantees";

export const PremiumFeatures = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5" id="premium-features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Offre limitée</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Devenez Early Supporter
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 h-full hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Offre Early Supporter Exclusive
                </CardTitle>
                <CardDescription className="space-y-4">
                  <p className="text-base">
                    Accédez à toutes les fonctionnalités premium dès que notre objectif de crowdfunding sera atteint !
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-primary">Rejoignez notre conseil des supporters</span> : participez activement aux décisions sur l'évolution de la plateforme
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-primary">Avantages à vie</span> : conservez votre statut premium et vos privilèges exclusifs
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold text-primary">Réductions exclusives</span> : bénéficiez de tarifs préférentiels sur les abonnements aux applications les plus populaires
                      </p>
                    </div>
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 flex flex-col"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 flex-grow hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Pourquoi choisir SubaCentral ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">🌟</span>
                  <p className="text-sm">Simplifiez votre quotidien : Prenez le contrôle de tous vos abonnements en un seul endroit avec une interface intuitive et efficace.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">📊</span>
                  <p className="text-sm">Gratuit et illimité pour les premières fonctionnalités : Gérez vos abonnements sans limite, suivez vos dépenses, et recevez des rappels, tout cela gratuitement.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">💳</span>
                  <p className="text-sm">Pas besoin de carte bancaire : Créez un compte en quelques secondes et profitez immédiatement de l'offre gratuite pour les 1000 premiers inscrits.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">🎯</span>
                  <p className="text-sm">Devenez un acteur du changement : En rejoignant notre communauté d'Early Supporters, participez activement aux décisions sur l'évolution de SubaCentral.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">👑</span>
                  <p className="text-sm">Avantages exclusifs à vie : En devenant Early Supporter, obtenez des privilèges premium exclusifs et profitez de réductions sur vos abonnements préférés.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">🔐</span>
                  <p className="text-sm">Vos données sont en sécurité : Nous utilisons les standards de sécurité les plus élevés pour protéger vos informations.</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-lg flex-shrink-0">🚀</span>
                  <p className="text-sm">Soutenez une vision ambitieuse : SubaCentral évolue grâce à ses utilisateurs. En tant qu'Early Supporter, vous contribuez directement au développement de fonctionnalités innovantes.</p>
                </motion.div>
              </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 hover:shadow-xl transition-shadow duration-300">
              <Guarantees />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};