import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { TrendingAppCard } from "./TrendingAppCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const TrendingAppsSection = () => {
  const { data: trendingApps, isLoading } = useQuery({
    queryKey: ['trending-apps-with-promos'],
    queryFn: async () => {
      console.log("Fetching trending apps with promo codes...");
      
      const { data: promoData, error: promoError } = await supabase
        .from('promo_codes')
        .select(`
          *,
          application: application_id (
            id,
            "NOM",
            "PRICE",
            "DESCRIPTION",
            "CATÉGORIE",
            "URL DU LOGO",
            "URL DU SITE WEB"
          )
        `)
        .eq('is_active', true)
        .gte('valid_until', new Date().toISOString());

      if (promoError) {
        console.error("Error fetching promo codes:", promoError);
        throw promoError;
      }

      // Group apps by category
      const groupedApps = promoData.reduce((acc: any, promo) => {
        const category = promo.application.CATÉGORIE;
        if (!category) return acc;

        if (!acc[category]) {
          acc[category] = [];
        }

        acc[category].push({
          app: {
            id: promo.application.id,
            name: promo.application.NOM,
            price: parseFloat(promo.application.PRICE || "0"),
            description: promo.application.DESCRIPTION,
            category: promo.application.CATÉGORIE,
            logo_url: promo.application["URL DU LOGO"],
            website_url: promo.application["URL DU SITE WEB"],
          },
          promoCode: {
            code: promo.code,
            discount_amount: promo.discount_amount,
            discount_type: promo.discount_type,
            description: promo.description,
          }
        });

        return acc;
      }, {});

      return groupedApps;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const categories = Object.keys(trendingApps || {});

  if (!categories.length) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          Applications Tendances
        </h2>
      </div>

      <Tabs defaultValue={categories[0]} className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="min-w-[150px]"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingApps[category].map((item: any) => (
                <TrendingAppCard
                  key={item.app.id}
                  app={item.app}
                  promoCode={item.promoCode}
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};