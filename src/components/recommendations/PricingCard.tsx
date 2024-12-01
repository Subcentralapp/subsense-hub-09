import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Gift } from "lucide-react";
import { motion } from "framer-motion";

interface PricingCardProps {
  app: {
    name: string;
    category: string;
    description: string;
    price: number;
    website_url: string | null;
    features?: string[];
    isPopular?: boolean;
  };
  promoCode: {
    code: string;
    discount_amount: number;
    description: string | null;
  };
}

export const PricingCard = ({ app, promoCode }: PricingCardProps) => {
  const handleVisitSite = () => {
    if (app.website_url) {
      window.open(app.website_url, '_blank');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="relative p-6 bg-[#1A1F2C] text-white hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        <div className="absolute top-4 right-4">
          <Badge className="bg-indigo-600 text-white">
            <Gift className="w-3 h-3 mr-1" />
            Promo
          </Badge>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-sm text-gray-400">{app.category}</span>
            <h3 className="text-2xl font-bold text-white">{app.name}</h3>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-white">${app.price}</span>
              <span className="text-gray-400">/mois</span>
            </div>
            <p className="text-sm text-indigo-400">
              {promoCode.description}
            </p>
          </div>

          <p className="text-sm text-gray-300 line-clamp-2">
            {app.description}
          </p>

          {app.features && (
            <ul className="space-y-2">
              {app.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Button 
            onClick={handleVisitSite}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            J'en profite !
          </Button>

          <p className="text-xs text-center text-gray-400">
            Garantie satisfait ou remboursé sous 30 jours
          </p>
        </div>
      </Card>
    </motion.div>
  );
};