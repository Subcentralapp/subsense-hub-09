import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, RefreshCw } from "lucide-react";
import { useState } from "react";
import { RecommendationCard } from "./RecommendationCard";
import { useRecommendations } from "@/hooks/useRecommendations";

const RecommendationList = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const { recommendations, isLoading } = useRecommendations(refreshKey);

  const handleRefresh = () => {
    console.log("Refreshing recommendations...");
    setRefreshKey(prev => prev + 1);
  };

  if (!recommendations?.length) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold text-neutral-900">
            Applications Recommandées
          </h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          className="hover:bg-primary/10 hover:text-primary border-primary/20"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualiser
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i} className="h-48 animate-pulse bg-neutral-light" />
          ))
        ) : (
          recommendations?.map((app) => (
            <RecommendationCard key={app.name} app={app} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendationList;