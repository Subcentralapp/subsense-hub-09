import { AlertCircle } from "lucide-react";
import { Application } from "@/types/application";
import { SavingsBadge } from "../badges/SavingsBadge";

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
  return (
    <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200 space-y-3">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Vous utilisez actuellement <span className="font-medium">{currentApp.name}</span>.
            Nous vous suggérons <span className="font-medium">{alternativeApp.name}</span> comme
            alternative plus économique avec des fonctionnalités similaires.
          </p>
          <SavingsBadge amount={savingsAmount} />
        </div>
      </div>
    </div>
  );
};