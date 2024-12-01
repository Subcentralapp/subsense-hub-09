import { usePromoApps } from "@/hooks/usePromoApps";
import { PricingCard } from "./PricingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";

export const TrendingAppsSection = () => {
  const { data: trendingApps, isLoading } = usePromoApps();
  console.log("Trending Apps Data:", trendingApps);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!trendingApps) {
    return null;
  }

  const categories = Object.keys(trendingApps);
  console.log("Categories:", categories);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-indigo-500" />
          Applications Recommandées
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingApps["Applications Recommandées"].map((item: any) => (
          <PricingCard
            key={item.app.id}
            app={item.app}
            promoCode={item.promoCode}
          />
        ))}
      </div>
    </div>
  );
};