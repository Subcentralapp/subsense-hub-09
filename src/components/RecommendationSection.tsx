import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const RecommendationSection = () => {
  const [selectedRec, setSelectedRec] = useState<null | {
    title: string;
    description: string;
    saving: string;
    details?: string;
    websiteUrl?: string;
  }>(null);

  const recommendations = [
    {
      title: "Optimisation Streaming",
      description: "Vous avez Netflix et Disney+. Envisagez un abonnement groupé pour économiser 20%.",
      saving: "5,99 €/mois",
      details: "En regroupant vos abonnements Netflix et Disney+ via une offre combinée, vous pouvez réaliser une économie significative. Plusieurs opérateurs proposent des packages incluant ces deux services avec une réduction allant jusqu'à 20%. Cela représente une économie annuelle de plus de 70€.",
      websiteUrl: "https://www.sfr.fr/offre-internet/box-plus",
    },
    {
      title: "Double Musique",
      description: "Vous avez Spotify et Apple Music. Nous recommandons de garder uniquement Spotify.",
      saving: "9,99 €/mois",
      details: "Avoir deux services de streaming musical n'est pas optimal. Spotify offre un catalogue très similaire à Apple Music. En gardant uniquement Spotify, vous économisez le coût d'Apple Music sans perdre d'accès à la musique. De plus, Spotify propose des fonctionnalités uniques comme les playlists collaboratives et une meilleure découverte musicale.",
      websiteUrl: "https://www.spotify.com/fr/premium/",
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
                <Button 
                  variant="ghost" 
                  className="hover-scale"
                  onClick={() => setSelectedRec(rec)}
                >
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Dialog open={!!selectedRec} onOpenChange={() => setSelectedRec(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {selectedRec?.title}
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <p className="text-sm text-gray-600">{selectedRec?.details}</p>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-700">
                  Économie potentielle: {selectedRec?.saving}
                </p>
              </div>
              {selectedRec?.websiteUrl && (
                <Button 
                  className="w-full mt-4 group"
                  onClick={() => window.open(selectedRec.websiteUrl, '_blank')}
                >
                  Voir l'offre
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecommendationSection;