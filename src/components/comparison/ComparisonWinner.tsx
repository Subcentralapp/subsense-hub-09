import { Application } from "@/types/application";
import { Trophy, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ComparisonWinnerProps {
  winner: Application;
  analysis: any;
}

export const ComparisonWinner = ({ winner, analysis }: ComparisonWinnerProps) => {
  // Convertir la chaîne pros en tableau en la divisant par des points
  const prosArray = analysis[winner.name || '']?.pros
    ? analysis[winner.name || ''].pros.split('.')
        .map((item: string) => item.trim())
        .filter((item: string) => item.length > 0)
    : [];

  // Prendre les 3 premiers avantages s'ils existent
  const topPros = prosArray.slice(0, 3);

  return (
    <Card className="p-6 mt-8 bg-gradient-to-r from-primary/10 to-primary/5">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-full bg-primary/20">
          <Trophy className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2">
            {winner.name}
            <span className="text-sm font-normal text-gray-600">
              Meilleur choix dans sa catégorie
            </span>
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">
              {analysis[winner.name || ''].userExperienceScore}/10
            </span>
            <span className="text-sm text-gray-500">
              Score utilisateur
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Points Forts</h4>
          <ul className="space-y-1">
            {topPros.map((pro: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-600">• {pro}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Meilleur Pour</h4>
          <ul className="space-y-1">
            {(winner.features || []).slice(0, 3).map((useCase: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-600">• {useCase}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-gray-700">Caractéristiques Uniques</h4>
          <p className="text-sm text-gray-600">
            {analysis[winner.name || ''].securityFeatures.description}
          </p>
        </div>
      </div>
    </Card>
  );
};