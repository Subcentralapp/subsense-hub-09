import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";

interface TrendingAppCardProps {
  app: {
    name: string;
    category: string;
    description: string;
    price: number;
    website_url: string | null;
  };
  promoCode: {
    code: string;
    discount_amount: number;
    discount_type: string | null;
    description: string | null;
  };
}

export const TrendingAppCard = ({ app, promoCode }: TrendingAppCardProps) => {
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
      <Card className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white hover:shadow-xl transition-all duration-300">
        <Badge className="absolute top-4 right-4 bg-indigo-700 hover:bg-indigo-600">
          <Gift className="w-3 h-3 mr-1" />
          Promo
        </Badge>

        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <span className="text-sm text-gray-300">{app.category}</span>
            <h3 className="text-2xl font-bold">{app.name}</h3>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">${app.price}</span>
              <span className="text-gray-400">/month</span>
            </div>
            <p className="text-sm text-gray-400">+3 EXTRA months</p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-2">
            {app.description}
          </p>

          {/* Action Button */}
          <Button 
            onClick={handleVisitSite}
            className="w-full bg-indigo-700 hover:bg-indigo-600 text-white"
          >
            J'en profite !
          </Button>

          {/* Money-back guarantee */}
          <p className="text-xs text-center text-gray-400">
            Garantie satisfait ou remboursé sous 30 jours
          </p>
        </div>
      </Card>
    </motion.div>
  );
};