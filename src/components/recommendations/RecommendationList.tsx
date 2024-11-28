import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";

const RecommendationList = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  // First fetch user's active subscriptions
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
  });

  // Then fetch and filter recommendations based on subscriptions
  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', refreshKey, subscriptions],
    queryFn: async () => {
      console.log("Fetching smart recommendations...");
      if (!subscriptions) return [];

      // Get all applications
      const { data: allApps, error } = await supabase
        .from('applications')
        .select('*');

      if (error) throw error;
      
      // Filter out applications user already has
      const existingAppNames = new Set(subscriptions.map(sub => sub.name.toLowerCase()));
      const availableApps = (allApps || []).filter(app => 
        !existingAppNames.has(app.name.toLowerCase())
      );

      // Group apps by category to recommend similar ones
      const userCategories = new Set(subscriptions.map(sub => sub.category));
      
      // Prioritize apps in same categories as user's subscriptions
      const prioritizedApps = availableApps.sort((a, b) => {
        const aInUserCategory = userCategories.has(a.category || '');
        const bInUserCategory = userCategories.has(b.category || '');
        if (aInUserCategory && !bInUserCategory) return -1;
        if (!aInUserCategory && bInUserCategory) return 1;
        return 0;
      });

      // Return top 3 recommendations
      return prioritizedApps.slice(0, 3);
    },
    enabled: !!subscriptions,
  });

  const handleRefresh = () => {
    console.log("Refreshing recommendations...");
    setRefreshKey(prev => prev + 1);
  };

  if (!subscriptions?.length) {
    return null; // Don't show recommendations if user has no subscriptions
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <h2 className="text-2xl font-semibold text-gray-900">Applications Recommandées</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="hover-scale"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="h-48 animate-pulse bg-neutral-light" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations?.map((app) => (
            <Card 
              key={app.name}
              className="p-6 hover-scale glass-card group transition-all duration-300 ease-in-out"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  {app.logo_url ? (
                    <img
                      src={app.logo_url}
                      alt={app.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {app.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">{app.category}</p>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 flex-grow">
                  {app.description || "Aucune description disponible"}
                </p>
                
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-semibold text-primary">
                    {app.price ? `${app.price}€/mois` : 'Gratuit'}
                  </span>
                  {app.website_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(app.website_url, '_blank')}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Voir plus
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationList;