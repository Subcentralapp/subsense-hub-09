import { ArrowLeft, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { ComparisonCard } from "./ComparisonCard";
import { ComparisonWinner } from "./ComparisonWinner";
import { motion } from "framer-motion";

interface ComparisonResultProps {
  apps: Application[];
  comparisonData: any;
  isLoading: boolean;
  onNewComparison: () => void;
}

export const ComparisonResult = ({
  apps,
  comparisonData,
  isLoading,
  onNewComparison,
}: ComparisonResultProps) => {
  if (isLoading || !comparisonData) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium text-gray-600">
            Analyse approfondie en cours...
          </p>
        </div>
      </Card>
    );
  }

  if (!comparisonData || Object.keys(comparisonData).length === 0) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-lg font-medium text-gray-600">
            Impossible de générer la comparaison. Veuillez réessayer.
          </p>
          <Button onClick={onNewComparison}>Nouvelle comparaison</Button>
        </div>
      </Card>
    );
  }

  const winner = apps.reduce((prev, current) => {
    if (!comparisonData[prev.name] || !comparisonData[current.name]) {
      return prev;
    }
    const prevScore = comparisonData[prev.name].userExperienceScore;
    const currentScore = comparisonData[current.name].userExperienceScore;
    return currentScore > prevScore ? current : prev;
  }, apps[0]);

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
              onSelect={() => window.open(app.website_url, '_blank')}
            />
          </motion.div>
        ))}
      </div>

      {winner && comparisonData && comparisonData[winner.name] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ComparisonWinner winner={winner} analysis={comparisonData} />
        </motion.div>
      )}
    </motion.div>
  );
};