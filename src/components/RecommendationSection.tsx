import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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

        // Generate category recommendations
        const categories = [
          {
            category: "Productivité",
            name: "Productivité Essentiels",
            description: "Les meilleurs outils pour booster votre productivité",
            rating: 4.8,
            progress: 85,
            color: 'bg-blue-100'
          },
          {
            category: "Finance",
            name: "Finance Essentiels",
            description: "Solutions financières innovantes",
            rating: 4.7,
            progress: 80,
            color: 'bg-green-100'
          },
          {
            category: "Intelligence Artificielle",
            name: "IA Essentiels",
            description: "Les meilleurs outils d'IA",
            rating: 4.9,
            progress: 90,
            color: 'bg-purple-100'
          },
          {
            category: "Design",
            name: "Design Essentiels",
            description: "Outils de design professionnels",
            rating: 4.6,
            progress: 75,
            color: 'bg-pink-100'
          },
          {
            category: "Crypto",
            name: "Crypto Essentiels",
            description: "Plateformes crypto de confiance",
            rating: 4.5,
            progress: 70,
            color: 'bg-yellow-100'
          },
          {
            category: "Automatisation",
            name: "Automatisation Essentiels",
            description: "Automatisez vos tâches répétitives",
            rating: 4.8,
            progress: 85,
            color: 'bg-orange-100'
          }
        ];

        setCategoryRecommendations(categories);

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
    setCurrentApp(rec.currentApp);
    setAlternativeApp(rec.alternativeApp);
    setSelectedRec(rec);
  };

  const handleExploreCategory = (category: string) => {
    navigate(`/applications?category=${encodeURIComponent(category)}`);
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
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Découvrez par Catégorie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
