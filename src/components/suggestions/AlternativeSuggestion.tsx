import { AlertCircle, ExternalLink, Check, X } from "lucide-react";
import { Application } from "@/types/application";
import { Button } from "@/components/ui/button";

interface AlternativeSuggestionProps {
  currentApp: Application;
  alternativeApp: Application;
  savingsAmount: number;
}

export const AlternativeSuggestion = ({ 
  currentApp, 
  alternativeApp,
  savingsAmount
}: AlternativeSuggestionProps) => {
  const handleVisitWebsite = () => {
    if (alternativeApp.website_url) {
      window.open(alternativeApp.website_url, '_blank');
    }
  };

  return (
    <div className="p-4 bg-orange-50/50 backdrop-blur-sm rounded-lg border border-orange-100 space-y-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-orange-500 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Nous vous suggérons <span className="font-medium text-orange-700">{alternativeApp.name}</span> comme
            alternative plus économique à {currentApp.name}.
          </p>
          {alternativeApp.description && (
            <p className="text-xs text-gray-500">{alternativeApp.description}</p>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
            <span className="text-orange-600 font-medium">
              Économie : {savingsAmount.toFixed(2)}€/mois
            </span>
            <span className="hidden sm:inline text-gray-400">•</span>
            <span className="text-gray-600">
              {(savingsAmount * 12).toFixed(2)}€/an
            </span>
          </div>

          {alternativeApp.features && alternativeApp.features.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-sm font-medium text-gray-700">Fonctionnalités principales :</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {alternativeApp.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs">
                    <Check className="h-3 w-3 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {alternativeApp.website_url && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-orange-50"
          onClick={handleVisitWebsite}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Découvrir {alternativeApp.name}
        </Button>
      )}
    </div>
  );
};