import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { ComparisonCard } from "./ComparisonCard";
import { ComparisonWinner } from "./ComparisonWinner";
import { motion } from "framer-motion";

interface ComparisonResultProps {
  apps: Application[];
  onNewComparison: () => void;
}

export const ComparisonResult = ({
  apps,
  onNewComparison,
}: ComparisonResultProps) => {
  console.log("Rendering ComparisonResult with apps:", apps);

  if (!apps || apps.length < 2) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-lg font-medium text-gray-600">
            Veuillez sélectionner au moins 2 applications à comparer.
          </p>
          <Button onClick={onNewComparison}>Nouvelle comparaison</Button>
        </div>
      </Card>
    );
  }

  // Calculer le gagnant basé sur le rating et le nombre de fonctionnalités
  const winner = apps.reduce((prev, current) => {
    const prevScore = (prev.rating || 0) + (prev.features?.length || 0) * 0.2;
    const currentScore = (current.rating || 0) + (current.features?.length || 0) * 0.2;
    return currentScore > prevScore ? current : prev;
  }, apps[0]);

  // Préparer les données d'analyse pour chaque application
  const analysisData = apps.reduce((acc, app) => {
    acc[app.name || ''] = {
      userExperienceScore: app.rating ? app.rating * 2 : 5,
      pros: app.pros || '',
      cons: app.cons || '',
      bestUseCases: app.features || [],
      securityFeatures: {
        description: app.description || "Information non disponible"
      }
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <Button variant="ghost" onClick={onNewComparison} className="text-primary">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Nouvelle comparaison
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {apps.map((app, index) => (
          <motion.div
            key={app.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ComparisonCard
              app={app}
              isHighlighted={app.name === winner?.name}
              onSelect={() => window.open(app.website_url || '', '_blank')}
            />
          </motion.div>
        ))}
      </div>

      {winner && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ComparisonWinner winner={winner} analysis={analysisData} />
        </motion.div>
      )}
    </motion.div>
  );
};