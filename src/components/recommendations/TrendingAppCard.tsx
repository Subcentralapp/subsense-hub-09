import { Star, Gift, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface PromoCode {
  code: string;
  discount_amount: number;
  discount_type: 'percentage' | 'fixed_amount';
  description: string;
}

interface TrendingAppProps {
  app: {
    id: number;
    name: string;
    logo_url: string | null;
    description: string | null;
    price: number;
    category: string | null;
    website_url: string | null;
  };
  promoCode: PromoCode;
}

export const TrendingAppCard = ({ app, promoCode }: TrendingAppProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(promoCode.code);
    setCopied(true);
    toast({
      title: "Code promo copié !",
      description: "Utilisez-le lors de votre inscription sur le site.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

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
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
        {/* Badge Promo */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="destructive" className="animate-pulse">
            <Gift className="w-4 h-4 mr-1" />
            {promoCode.discount_amount}
            {promoCode.discount_type === 'percentage' ? '%' : '€'} OFF
          </Badge>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            {/* App Logo */}
            <div className="relative w-16 h-16 flex-shrink-0">
              {app.logo_url ? (
                <img
                  src={app.logo_url}
                  alt={app.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* App Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-gray-900">{app.name}</h3>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              </div>
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {app.description}
              </p>
              <p className="text-sm font-medium text-gray-900">
                À partir de {app.price}€/mois
              </p>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600 mb-2">{promoCode.description}</p>
            <div className="flex items-center gap-2">
              <code className="bg-white px-3 py-1 rounded border border-gray-200 font-mono text-primary font-bold">
                {promoCode.code}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyPromo}
                className="text-primary hover:text-primary/80"
              >
                {copied ? "Copié !" : "Copier"}
              </Button>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={handleVisitSite}
            className="w-full bg-primary hover:bg-primary/90 text-white group-hover:scale-105 transition-transform duration-200"
          >
            Profiter de l'offre
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};