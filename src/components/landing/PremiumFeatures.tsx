import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
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
import { CampaignGoals } from "./premium/CampaignGoals";

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Offre Early Supporter Exclusive</CardTitle>
              <CardDescription>
                Accédez à toutes les fonctionnalités premium pendant 1 an
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
                <Badge variant="secondary" className="py-2 px-4 text-sm flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Badge Early Supporter à vie</span>
                </Badge>
              </motion.div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Guarantees />
            <CampaignGoals />
          </div>
        </div>
      </div>
    </section>
  );
};