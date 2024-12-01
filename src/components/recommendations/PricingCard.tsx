import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star } from "lucide-react";
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
      <Card className={`relative p-6 ${app.isPopular ? 'bg-gradient-to-br from-violet-500 to-violet-600 text-white' : 'bg-white'} hover:shadow-xl transition-all duration-300 h-full flex flex-col`}>
        {app.isPopular && (
          <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black">
            <Star className="w-3 h-3 mr-1" />
            Meilleure offre
          </Badge>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <span className={`text-sm ${app.isPopular ? 'text-violet-200' : 'text-violet-600'}`}>
              {app.category}
            </span>
            <h3 className={`text-2xl font-bold ${app.isPopular ? 'text-white' : 'text-gray-900'}`}>
              {app.name}
            </h3>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className={`text-3xl font-bold ${app.isPopular ? 'text-white' : 'text-gray-900'}`}>
                {app.price}€
              </span>
              <span className={app.isPopular ? 'text-violet-200' : 'text-gray-500'}>
                /mois
              </span>
            </div>
            <p className={`text-sm ${app.isPopular ? 'text-violet-200' : 'text-violet-600'}`}>
              {promoCode.description}
            </p>
          </div>

          {app.features && (
            <ul className="space-y-2">
              {app.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className={`w-4 h-4 ${app.isPopular ? 'text-violet-200' : 'text-violet-500'}`} />
                  <span className={`text-sm ${app.isPopular ? 'text-violet-100' : 'text-gray-600'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Button 
            onClick={handleVisitSite}
            className={`w-full ${
              app.isPopular 
                ? 'bg-white text-violet-600 hover:bg-violet-50' 
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            Commencer maintenant
          </Button>

          <p className={`text-xs text-center ${app.isPopular ? 'text-violet-200' : 'text-gray-500'}`}>
            Garantie satisfait ou remboursé sous 30 jours
          </p>
        </div>
      </Card>
    </motion.div>
  );
};