import { useQuery } from "@tanstack/react-query";
import { PricingCard } from "./PricingCard";
import { Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabase";

export const TrendingAppsSection = () => {
  const { data: apps, isLoading } = useQuery({
    queryKey: ["trending-apps"],
    queryFn: async () => {
      console.log("Fetching trending apps...");
      const { data: applications, error } = await supabase
        .from("applications")
        .select("*")
        .in("NOM", ["Make", "Revolut", "Jasper AI", "Canva", "Binance", "ClickUp"])
        .limit(6);

      if (error) {
        console.error("Error fetching apps:", error);
        throw error;
      }

      console.log("Fetched applications:", applications);

      const { data: promoCodes } = await supabase
        .from("promo_codes")
        .select("*")
        .in("application_id", applications.map(app => app.id));

      console.log("Fetched promo codes:", promoCodes);

      return applications.map(app => ({
        app: {
          id: app.id,
          name: app.NOM,
          description: app.DESCRIPTION,
          price: parseFloat(app.PRICE || "0"),
          website_url: app["URL DU SITE WEB"],
          category: app.CATÉGORIE,
          features: app.CARACTÉRISTIQUES || []
        },
        promoCode: {
          code: "PROMO2024",
          discount_amount: 20,
          description: "20% de réduction sur l'abonnement annuel"
        }
      }));
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!apps || apps.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-indigo-500" />
          Applications Recommandées
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((item, index) => (
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