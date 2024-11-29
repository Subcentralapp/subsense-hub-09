import { AlertCircle } from "lucide-react";
import { Application } from "@/types/application";

interface AlternativeSuggestionProps {
  currentApp: Application;
  alternativeApp: Application;
  savingsAmount: number;
}

export const AlternativeSuggestion = ({ 
  currentApp, 
  alternativeApp
}: AlternativeSuggestionProps) => {
  return (
    <div className="p-4 bg-green-50/50 backdrop-blur-sm rounded-lg border border-green-100 space-y-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-1" />
        <div>
          <p className="text-sm text-gray-600">
            Nous vous suggérons <span className="font-medium text-green-700">{alternativeApp.name}</span> comme
            alternative plus économique avec des fonctionnalités similaires.
          </p>
        </div>
      </div>
    </div>
  );
};