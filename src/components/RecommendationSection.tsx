import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const RecommendationSection = () => {
  const recommendations = [
    {
      title: "Optimisation Streaming",
      description: "Vous avez Netflix et Disney+. Envisagez un abonnement groupé pour économiser 20%.",
      saving: "5,99 €/mois",
    },
    {
      title: "Double Musique",
      description: "Vous avez Spotify et Apple Music. Nous recommandons de garder uniquement Spotify.",
      saving: "9,99 €/mois",
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-6">Recommandations Personnalisées</h2>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-100 hover-scale"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-primary/10 rounded-full mt-1">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">{rec.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{rec.description}</p>
                    <p className="text-sm font-medium text-green-600">
                      Économie potentielle: {rec.saving}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" className="hover-scale">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RecommendationSection;