import { Application } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonCardProps {
  app: Application;
  isHighlighted?: boolean;
  onSelect: () => void;
}

export const ComparisonCard = ({ app, isHighlighted, onSelect }: ComparisonCardProps) => {
  const basePrice = app.price || 0;
  const monthlyPrice = (basePrice / 12).toFixed(2);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
        isHighlighted 
          ? 'border-primary bg-gradient-to-b from-primary/5 to-primary/10 shadow-xl scale-105' 
          : 'border-gray-200 hover:border-primary/50 bg-white'
      }`}
    >
      {/* Header Section */}
      <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        {app.logo_url && (
          <img 
            src={app.logo_url} 
            alt={`${app.name} logo`}
            className="absolute top-4 right-4 w-12 h-12 rounded-xl object-contain bg-white p-2"
          />
        )}
        <div className="absolute bottom-6 left-6 text-white">
          <h3 className="text-2xl font-bold mb-1">{app.name}</h3>
          <p className="text-gray-300 text-sm">{app.category}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100">
        <div className="text-center">
          <p className="text-xs text-gray-500">Prix</p>
          <p className="text-lg font-bold text-primary">{monthlyPrice}€</p>
        </div>
        <div className="text-center border-x border-gray-100">
          <p className="text-xs text-gray-500">Note</p>
          <p className="text-lg font-bold text-primary">4.8/5</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Utilisateurs</p>
          <p className="text-lg font-bold text-primary">1M+</p>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-6 space-y-4">
        <h4 className="font-medium text-gray-700">Fonctionnalités Clés</h4>
        <ul className="space-y-3">
          {app.features?.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Section */}
        <div className="pt-4">
          <Button 
            onClick={onSelect}
            className={`w-full group ${isHighlighted ? 'bg-primary hover:bg-primary/90' : 'bg-primary/10 hover:bg-primary/20 text-primary'}`}
          >
            Voir l'offre
            <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          {isHighlighted && (
            <p className="text-xs text-center mt-2 text-primary">
              Meilleur choix dans sa catégorie
            </p>
          )}
        </div>
      </div>

      {/* Highlight Badge */}
      {isHighlighted && (
        <div className="absolute -right-12 top-8 bg-primary text-white text-sm py-1 px-12 rotate-45">
          Recommandé
        </div>
      )}
    </motion.div>
  );
};