import { Application } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Check, ExternalLink, Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonCardProps {
  app: Application;
  isHighlighted?: boolean;
  onSelect: () => void;
}

const formatUserCount = (count: number | null): string => {
  if (!count) return 'N/A';
  
  if (count >= 1000000) {
    const millions = Math.floor(count / 1000000);
    const remainder = count % 1000000;
    const thousands = Math.floor(remainder / 100000);
    return thousands > 0 ? `${millions}M${thousands}` : `${millions}M`;
  }
  
  if (count >= 1000) {
    return `${Math.floor(count / 1000)}K`;
  }
  
  return `${count}`;
};

export const ComparisonCard = ({ app, isHighlighted, onSelect }: ComparisonCardProps) => {
  const basePrice = app.price ? parseFloat(app.price.toString()) : 0;
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
          <p className="text-lg font-bold text-primary">{app.rating}/5</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-500">Utilisateurs</p>
          <p className="text-lg font-bold text-primary">
            {app.users_count ? formatUserCount(app.users_count) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Pros & Cons Section */}
      <div className="p-6 space-y-4">
        {app.pros && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Avantages</h4>
            <ul className="space-y-2">
              {app.pros.split('\n').map((pro, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Plus className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {app.cons && (
          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Inconvénients</h4>
            <ul className="space-y-2">
              {app.cons.split('\n').map((con, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Minus className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

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