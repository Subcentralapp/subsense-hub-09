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
import { Application } from "@/types/application";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
}

const RecommendationSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedRec, setSelectedRec] = useState<Recommendation | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [categoryRecommendations, setCategoryRecommendations] = useState<CategoryRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [currentApp, setCurrentApp] = useState<Application | null>(null);
  const [alternativeApp, setAlternativeApp] = useState<Application | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user's subscriptions
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          console.log("No user found, skipping recommendations");
          return;
        }

        // Fetch subscriptions
        const { data: userSubs, error: subsError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id);

        if (subsError) throw subsError;
        setSubscriptions(userSubs || []);

        // Fetch all applications
        const { data: allApps, error: appsError } = await supabase
          .from('applications')
          .select('*');

        if (appsError) throw appsError;
        setApplications(allApps || []);

        // Generate optimization recommendations
        const optimizations = userSubs?.map(sub => {
          const currentApp = allApps?.find(app => 
            app.NOM?.toLowerCase() === sub.name.toLowerCase()
          );
          
          if (!currentApp?.CATÉGORIE) return null;

          const alternatives = allApps?.filter(app => 
            app.CATÉGORIE === currentApp.CATÉGORIE && 
            Number(app.PRICE) < sub.price &&
            app.NOM?.toLowerCase() !== sub.name.toLowerCase()
          );

          if (!alternatives?.length) return null;

          const bestAlternative = alternatives.sort((a, b) => 
            Number(a.PRICE) - Number(b.PRICE)
          )[0];

          return {
            title: `Optimisation pour ${sub.name}`,
            description: `Une alternative plus économique avec des fonctionnalités similaires`,
            saving: sub.price - Number(bestAlternative.PRICE),
            currentApp,
            alternativeApp: bestAlternative,
            type: 'optimization'
          };
        }).filter(Boolean);

        setRecommendations(optimizations || []);

        // Generate category recommendations
        if (allApps) {
          const categories = [...new Set(allApps.map(app => app.CATÉGORIE))].filter(Boolean);
          const categoryRecs = categories.slice(0, 6).map((category, index) => {
            const appsInCategory = allApps.filter(app => app.CATÉGORIE === category);
            const avgRating = appsInCategory.reduce((sum, app) => sum + (app.NOTE || 0), 0) / appsInCategory.length;
            
            return {
              category: category as string,
              name: `${category} Essentiels`,
              description: `Découvrez les meilleures applications dans la catégorie ${category}`,
              rating: avgRating || 4.5,
              progress: 60 + Math.random() * 40,
              color: [
                'bg-red-100', 'bg-green-100', 'bg-orange-100',
                'bg-blue-100', 'bg-purple-100', 'bg-pink-100'
              ][index % 6],
              apps: appsInCategory
            };
          });
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

    fetchData();
  }, []);

  const handleSelectRecommendation = (rec: Recommendation) => {
    const currentAppData = applications.find(app => 
      app.NOM?.toLowerCase() === rec.currentApp.NOM?.toLowerCase()
    );
    const alternativeAppData = applications.find(app => 
      app.NOM?.toLowerCase() === rec.alternativeApp.NOM?.toLowerCase()
    );

    if (currentAppData && alternativeAppData) {
      setCurrentApp(currentAppData);
      setAlternativeApp(alternativeAppData);
      setSelectedRec(rec);
    }
  };

  const handleExploreCategory = async (category: string) => {
    try {
      const { data: apps } = await supabase
        .from('applications')
        .select('*')
        .eq('CATÉGORIE', category);
      
      if (apps && apps.length > 0) {
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
                      onSelect={handleSelectRecommendation}
                      currentPrice={Number(rec.currentApp.PRICE)}
                      alternativePrice={Number(rec.alternativeApp.PRICE)}
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
        currentApp={currentApp || undefined}
        alternativeApp={alternativeApp || undefined}
        onClose={() => {
          setSelectedRec(null);
          setCurrentApp(null);
          setAlternativeApp(null);
        }}
      />
    </div>
  );
};

export default RecommendationSection;