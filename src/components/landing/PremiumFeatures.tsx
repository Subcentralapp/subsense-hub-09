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
import { Button } from "@/components/ui/button";

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
                  Rejoignez la communauté Early Supporters !
                </CardTitle>
                <CardDescription>
                  <div className="space-y-6">
                    <PricingComparison />
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="flex flex-col items-center gap-4 pt-4"
                    >
                      <Badge variant="secondary" className="py-2 px-4 text-sm flex items-center gap-2 animate-pulse">
                        <BadgeCheck className="w-4 h-4" />
                        <span>Badge Early Supporter à vie</span>
                      </Badge>
                      <div className="flex gap-4">
                        <Button size="lg" className="font-semibold">
                          Je soutiens pour 19,99€
                        </Button>
                        <Button variant="outline" size="lg">
                          En savoir plus
                        </Button>
                      </div>
                    </motion.div>
                  </div>
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Pourquoi devenir Early Supporter ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Users className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Conseil des Supporters</p>
                    <p className="text-sm text-gray-600">Votez pour les prochaines fonctionnalités</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex items-start gap-3"
                >
                  <Crown className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Avantages à vie</p>
                    <p className="text-sm text-gray-600">Gardez votre statut premium exclusif pour toujours</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="flex items-start gap-3"
                >
                  <Gift className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Réductions permanentes</p>
                    <p className="text-sm text-gray-600">Profitez de réductions exclusives sur vos abonnements</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="flex items-start gap-3"
                >
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Support prioritaire</p>
                    <p className="text-sm text-gray-600">Bénéficiez d'une assistance VIP</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="flex items-start gap-3"
                >
                  <Rocket className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-primary mb-1">Accès anticipé</p>
                    <p className="text-sm text-gray-600">Testez les nouvelles fonctionnalités en avant-première</p>
                  </div>
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