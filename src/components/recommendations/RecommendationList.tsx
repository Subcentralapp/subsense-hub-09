import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Recommendation {
  currentApp: string;
  recommendedApp: string;
  potentialSavings: string;
  reason: string;
}

const RecommendationList = () => {
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      console.log("Fetching subscriptions for recommendations...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.log("No user found for recommendations");
        return [];
      }
      
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }
      
      console.log("Fetched subscriptions for recommendations:", data);
      return data || [];
    }
  });

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', subscriptions],
    queryFn: async () => {
      if (!subscriptions || subscriptions.length === 0) {
        console.log("No subscriptions found for recommendations");
        return [];
      }

      try {
        console.log("Calling recommendations endpoint...");
        const response = await fetch(
          'https://qhidxbdxcymhuyquyqgk.supabase.co/functions/v1/generate-recommendations',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ subscriptions }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        console.log("Received recommendations:", data);
        return data.recommendations || [];
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
      }
    },
    enabled: !!subscriptions && subscriptions.length > 0,
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/20 shadow-xl mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        Recommandations d'Optimisation
      </h2>
      
      <div className="space-y-4">
        {recommendations && recommendations.length > 0 ? (
          recommendations.map((rec: Recommendation, index: number) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 text-lg">
                    {rec.currentApp} → {rec.recommendedApp}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">{rec.reason}</p>
                  <p className="text-sm font-medium text-green-600 mt-3">
                    Économie potentielle : {rec.potentialSavings}/mois
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                  En savoir plus
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-neutral-50 rounded-lg border border-gray-100">
            <p className="text-gray-500">
              Aucune recommandation disponible pour le moment
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RecommendationList;