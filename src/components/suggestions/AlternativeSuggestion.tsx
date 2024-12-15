import { AlertCircle, ExternalLink } from "lucide-react";
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
    <div className="p-4 bg-green-50/50 backdrop-blur-sm rounded-lg border border-green-100 space-y-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Nous vous suggérons <span className="font-medium text-green-700">{alternativeApp.name}</span> comme
            alternative plus économique à {currentApp.name}.
          </p>
          {alternativeApp.description && (
            <p className="text-xs text-gray-500">{alternativeApp.description}</p>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-medium">Économie potentielle : {savingsAmount.toFixed(2)}€/mois</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">{(savingsAmount * 12).toFixed(2)}€/an</span>
          </div>
        </div>
      </div>
      
      {alternativeApp.website_url && (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full hover:bg-green-50"
          onClick={handleVisitWebsite}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Découvrir {alternativeApp.name}
        </Button>
      )}
    </div>
  );
};