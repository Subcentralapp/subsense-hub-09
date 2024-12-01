import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";

const RecommendationSection = () => {
  const { toast } = useToast();
  const [selectedRec, setSelectedRec] = useState<null | {
    title: string;
    description: string;
    saving: string;
    details?: string;
    websiteUrl?: string;
  }>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log("No user found, skipping recommendations");
          return;
        }

        const { data, error } = await supabase.functions.invoke('generate-recommendations', {
          body: { user },
        });

        if (error) throw error;

        console.log("Received recommendations:", data);
        const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
        
        if (!parsedData?.recommendations || !Array.isArray(parsedData.recommendations)) {
          throw new Error("Format de réponse invalide");
        }
        
        setRecommendations(parsedData.recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setError("Impossible de charger les recommandations pour le moment.");
        toast({
          title: "Erreur",
          description: "Impossible de charger les recommandations pour le moment.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-gray-500">Chargement des recommandations...</p>
          </div>
        </div>
      </Card>
    );
  }

  // Même s'il y a une erreur ou pas de recommandations, on affiche quand même le bloc
  return (
    <div className="space-y-6 fade-in">
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Recommandations Personnalisées
        </h2>
        
        {error ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Réessayer
            </Button>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">Aucune recommandation disponible pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
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
                        Économie potentielle: {rec.saving}€
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="hover:bg-primary/10"
                    onClick={() => setSelectedRec(rec)}
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Dialog open={!!selectedRec} onOpenChange={() => setSelectedRec(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {selectedRec?.title}
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <p className="text-sm text-gray-600">{selectedRec?.details}</p>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-700">
                  Économie potentielle: {selectedRec?.saving}€
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