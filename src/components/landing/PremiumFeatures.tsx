import { motion } from "framer-motion";
import { BadgeCheck, Sparkles, Users, Gift, Crown, Heart, Shield, Rocket } from "lucide-react";
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
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Devenez Early Supporter</span>
          </motion.div>
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
                    Rejoignez notre communauté d'Early Supporters et bénéficiez d'avantages exclusifs dès que notre objectif de crowdfunding sera atteint !
                  </p>
                  <div className="bg-primary/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Conseil des Supporters</p>
                        <p className="text-sm text-gray-600">
                          Participez activement aux décisions sur l'évolution de la plateforme et votez pour les prochaines fonctionnalités
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Crown className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Avantages à vie</p>
                        <p className="text-sm text-gray-600">
                          Conservez votre statut premium et vos privilèges exclusifs même après la période initiale
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Réductions exclusives</p>
                        <p className="text-sm text-gray-600">
                          Accédez à des réductions permanentes sur les abonnements aux applications les plus populaires
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Support prioritaire</p>
                        <p className="text-sm text-gray-600">
                          Bénéficiez d'une assistance dédiée et de réponses rapides à vos questions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Rocket className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Accès anticipé</p>
                        <p className="text-sm text-gray-600">
                          Testez les nouvelles fonctionnalités en avant-première et participez à leur évolution
                        </p>
                      </div>
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
                  className="flex items-center gap-2"
                >
                  <Users className="w-5 h-5 text-primary" />
                  <p className="text-sm">Participez aux décisions sur l'évolution de la plateforme</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Crown className="w-5 h-5 text-primary" />
                  <p className="text-sm">Statut premium et privilèges exclusifs à vie</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <Gift className="w-5 h-5 text-primary" />
                  <p className="text-sm">Réductions permanentes sur les applications populaires</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-center gap-2"
                >
                  <Shield className="w-5 h-5 text-primary" />
                  <p className="text-sm">Support prioritaire et assistance dédiée</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex items-center gap-2"
                >
                  <Rocket className="w-5 h-5 text-primary" />
                  <p className="text-sm">Accès anticipé aux nouvelles fonctionnalités</p>
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