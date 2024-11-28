import { Check, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface ComparisonResultProps {
  app1: Application | null;
  app2: Application | null;
  winner: Application | null;
  onNewComparison: () => void;
}

export const ComparisonResult = ({
  app1,
  app2,
  winner,
  onNewComparison,
}: ComparisonResultProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Comparaison des Services</h2>
        <Button variant="outline" onClick={onNewComparison}>
          Nouvelle comparaison
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[app1, app2].map((app, index) => (
          <div
            key={`app-${index}`}
            className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{app?.name}</h3>
            <p className="text-2xl font-bold mb-4">{app?.price} €/mois</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <p className="text-sm">Catégorie: {app?.category}</p>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <p className="text-sm">Fonctionnalités principales:</p>
              </div>
              <ul className="ml-6 space-y-1">
                {app?.description?.split('.').filter(Boolean).map((feature, idx) => (
                  <li key={`feature-${index}-${idx}`} className="text-sm text-gray-600 list-disc">
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {winner && (
        <div className="bg-primary/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Application Recommandée</h3>
          </div>
          <p className="text-gray-700">
            Basé sur notre analyse comparative, nous recommandons{" "}
            <span className="font-semibold text-primary">{winner.name}</span> pour les raisons suivantes :
          </p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              {winner.price < (app1?.name === winner.name ? app2?.price || 0 : app1?.price || 0) 
                ? "Meilleur rapport qualité-prix"
                : "Fonctionnalités plus complètes"}
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              Description plus détaillée des services
            </li>
          </ul>
        </div>
      )}
    </Card>
  );
};