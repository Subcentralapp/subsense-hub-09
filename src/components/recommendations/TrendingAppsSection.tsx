import { useQuery } from "@tanstack/react-query";
import { PricingCard } from "./PricingCard";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const TrendingAppsSection = () => {
  const { data: apps, isLoading } = useQuery({
    queryKey: ["trending-apps"],
    queryFn: async () => {
      console.log("Fetching trending apps...");
      
      // Modification de la requête pour utiliser OR et des conditions plus précises
      const { data: applications, error } = await supabase
        .from("applications")
        .select("*")
        .or('NOM.eq.Make,NOM.eq.Revolut,NOM.eq.Jasper AI,NOM.eq.Canva,NOM.eq.Binance,NOM.eq.ClickUp')
        .limit(6);

      if (error) {
        console.error("Error fetching apps:", error);
        throw error;
      }

      console.log("Fetched applications raw data:", applications);

      // Vérification des données avant mapping
      if (!applications || applications.length === 0) {
        console.error("No applications found");
        return [];
      }

      // Mapping avec vérification des données
      const mappedApps = applications.map(app => {
        console.log("Mapping application:", app.NOM);
        return {
          app: {
            id: app.id,
            name: app.NOM || "Unknown",
            description: app.DESCRIPTION || "No description available",
            price: parseFloat(app.PRICE || "0"),
            website_url: app["URL DU SITE WEB"],
            category: app.CATÉGORIE || "Other",
            features: app.CARACTÉRISTIQUES || []
          },
          promoCode: {
            code: `${app.NOM?.toUpperCase?.() || 'APP'}2024`,
            discount_amount: 20,
            description: "20% de réduction sur l'abonnement annuel"
          }
        };
      });

      console.log("Mapped applications:", mappedApps);
      return mappedApps;
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
    console.log("No apps to display");
    return null;
  }

  console.log("Rendering apps:", apps);

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
            key={`${item.app.id}-${index}`}
            app={item.app}
            promoCode={item.promoCode}
          />
        ))}
      </div>
    </div>
  );
};
