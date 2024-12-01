import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { Alert, AlertDescription } from "./ui/alert";
import { motion } from "framer-motion";
import { Application } from "@/types/application";

interface Recommendation {
  title: string;
  description: string;
  saving: number;
  details?: string;
  websiteUrl?: string;
  type?: string;
}

interface CategoryRecommendation {
  category: string;
  name: string;
  description: string;
  rating: number;
  progress: number;
  color: string;
}

const RecommendationSection = () => {
  const { toast } = useToast();
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
              saving: Math.round(sub.price * 0.2), // Example: 20% potential saving
              details: `Découvrez comment optimiser votre abonnement ${sub.name} et économiser jusqu'à ${Math.round(sub.price * 0.2)}€ par mois.`,
              type: 'optimization'
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
            {/* Optimization Recommendations */}
            {recommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-800">Optimisations Suggérées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all hover:border-primary/20"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Sparkles className="h-5 w-5 text-primary" />
                          </div>
                          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                            -{rec.saving}€/mois
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{rec.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                        </div>
                        <Button 
                          variant="ghost" 
                          className="w-full hover:bg-primary/10 hover:text-primary"
                          onClick={() => setSelectedRec(rec)}
                        >
                          Voir les détails
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Category Recommendations */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800">Découvrez par Catégorie</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryRecommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${rec.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-600">
                          {rec.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium">{rec.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-xl font-semibold text-gray-900">{rec.name}</h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {rec.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Progression</span>
                          <span className="font-medium">{Math.round(rec.progress)}%</span>
                        </div>
                        <div className="h-2 bg-white/50 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary/60 rounded-full transition-all duration-500"
                            style={{ width: `${rec.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RecommendationSection;