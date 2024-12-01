import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift } from "lucide-react";
import { motion } from "framer-motion";

interface StyledCategoryCardProps {
  app: {
    name: string;
    category: string;
    description: string;
    price: number;
    hasPromo?: boolean;
    website_url: string;
  };
  onExplore: () => void;
}

export const StyledCategoryCard = ({ app, onExplore }: StyledCategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Card className="relative p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white hover:shadow-xl transition-all duration-300 overflow-hidden">
        {app.hasPromo && (
          <Badge className="absolute top-4 right-4 bg-primary/80 hover:bg-primary text-white">
            <Gift className="w-3 h-3 mr-1" />
            Promo
          </Badge>
        )}

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
            onClick={onExplore}
            className="w-full bg-primary hover:bg-primary/90"
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