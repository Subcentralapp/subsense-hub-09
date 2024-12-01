import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, ExternalLink, Loader2, AlertCircle } from "lucide-react";
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
import { Alert, AlertDescription } from "./ui/alert";

const RecommendationSection = () => {
  const { toast } = useToast();
  const [selectedRec, setSelectedRec] = useState<null | {
    title: string;
    description: string;
    saving: number;
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

        console.log("Fetching recommendations for user:", user.id);
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
      <Card className="p-8">
        <div className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-gray-500">Analyse de vos abonnements en cours...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-8 glass-card">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Recommandations Personnalisées
        </h2>
        
        {error ? (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : recommendations.length === 0 ? (
          <div className="p-6 text-center bg-neutral-50 rounded-lg">
            <p className="text-gray-500">Aucune recommandation disponible pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300 hover:border-primary/20"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 bg-primary/10 rounded-full mt-1">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-medium text-lg">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                          Économie: {rec.saving}€/mois
                        </span>
                        {rec.type && (
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                            {rec.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="hover:bg-primary/10 shrink-0"
                    onClick={() => setSelectedRec(rec)}
                  >
                    Détails
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Dialog open={!!selectedRec} onOpenChange={() => setSelectedRec(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {selectedRec?.title}
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{selectedRec?.details}</p>
                {selectedRec?.affected_subscriptions && (
                  <div className="p-4 bg-neutral-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 mb-2">Abonnements concernés :</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {selectedRec.affected_subscriptions.map((sub: string, i: number) => (
                        <li key={i}>{sub}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-700">
                    Économie potentielle: {selectedRec?.saving}€ par mois
                  </p>
                </div>
                {selectedRec?.suggested_action && (
                  <p className="text-sm font-medium text-primary">
                    Action suggérée : {selectedRec.suggested_action}
                  </p>
                )}
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