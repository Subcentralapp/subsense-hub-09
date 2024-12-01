import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { Alert, AlertDescription } from "./ui/alert";
import { OptimizationCard } from "./recommendations/OptimizationCard";
import { CategoryCard } from "./recommendations/CategoryCard";
import { RecommendationDialog } from "./recommendations/RecommendationDialog";
import { Recommendation, CategoryRecommendation } from "@/types/recommendation";
import { useNavigate } from "react-router-dom";

const RecommendationSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [categoryRecommendations, setCategoryRecommendations] = useState<CategoryRecommendation[]>([]);
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

        // Fetch user's subscriptions
        const { data: subscriptions } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id);

        // Generate optimization recommendations based on subscriptions
        if (subscriptions && subscriptions.length > 0) {
          const optimizations = subscriptions
            .filter(sub => sub.price > 0)
            .map(sub => ({
              title: `Optimisation pour ${sub.name}`,
              description: `Nous avons détecté une opportunité d'économie sur votre abonnement ${sub.name}.`,
              saving: Math.round(sub.price * 0.2),
              details: `Découvrez comment optimiser votre abonnement ${sub.name} et économiser jusqu'à ${Math.round(sub.price * 0.2)}€ par mois.`,
              type: 'optimization',
              websiteUrl: sub.website_url
            }));
          setRecommendations(optimizations);
        }

        // Fetch and generate category-based recommendations
        const { data: applications } = await supabase
          .from('applications')
          .select('*');

        if (applications) {
          const categories = [...new Set(applications.map(app => app.CATÉGORIE))].filter(Boolean);
          const categoryRecs = categories.slice(0, 6).map((category, index) => ({
            category: category as string,
            name: `${category} Essentiels`,
            description: `Découvrez les meilleures applications dans la catégorie ${category}.`,
            rating: 4 + Math.random(),
            progress: 60 + Math.random() * 40,
            color: [
              'bg-red-100', 'bg-green-100', 'bg-orange-100',
              'bg-blue-100', 'bg-purple-100', 'bg-pink-100'
            ][index % 6]
          }));
          setCategoryRecommendations(categoryRecs);
        }

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

  const handleExploreCategory = async (category: string) => {
    try {
      const { data: apps } = await supabase
        .from('applications')
        .select('*')
        .eq('CATÉGORIE', category);
      
      if (apps && apps.length > 0) {
        // Redirect to a category view or show apps in a dialog
        navigate(`/applications?category=${encodeURIComponent(category)}`);
      } else {
        toast({
          title: "Aucune application trouvée",
          description: `Aucune application n'est disponible dans la catégorie ${category}.`,
        });
      }
    } catch (error) {
      console.error("Error exploring category:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les applications de cette catégorie.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="flex items-center justify-center h-40">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-8">
            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Optimisations Suggérées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <OptimizationCard
                      key={index}
                      rec={rec}
                      onSelect={setSelectedRec}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Découvrez par Catégorie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryRecommendations.map((rec, index) => (
                  <CategoryCard
                    key={index}
                    rec={rec}
                    onExplore={handleExploreCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      <RecommendationDialog
        recommendation={selectedRec}
        onClose={() => setSelectedRec(null)}
      />
    </div>
  );
};

export default RecommendationSection;