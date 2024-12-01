import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PromoCodeWithApp } from "@/types/promo";

export const usePromoApps = () => {
  return useQuery({
    queryKey: ['trending-apps-with-promos'],
    queryFn: async () => {
      console.log("Fetching trending apps with promo codes...");
      
      const { data, error } = await supabase
        .from('promo_codes')
        .select(`
          code,
          discount_amount,
          discount_type,
          description,
          applications (
            id,
            NOM,
            PRICE,
            DESCRIPTION,
            CATÉGORIE,
            "URL DU LOGO",
            "URL DU SITE WEB"
          )
        `)
        .eq('is_active', true)
        .gte('valid_until', new Date().toISOString());

      if (error) {
        console.error("Error fetching promo codes:", error);
        throw error;
      }

      if (!data) {
        console.log("No data returned from query");
        return {};
      }

      console.log("Fetched promo data:", data);

      // Group apps by category
      const groupedApps = (data as PromoCodeWithApp[]).reduce((acc: Record<string, any[]>, promo) => {
        const app = promo.applications;
        if (!app?.CATÉGORIE) return acc;

        if (!acc[app.CATÉGORIE]) {
          acc[app.CATÉGORIE] = [];
        }

        acc[app.CATÉGORIE].push({
          app: {
            id: app.id,
            name: app.NOM,
            price: parseFloat(app.PRICE || "0"),
            description: app.DESCRIPTION,
            category: app.CATÉGORIE,
            logo_url: app["URL DU LOGO"],
            website_url: app["URL DU SITE WEB"],
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

      console.log("Grouped apps by category:", groupedApps);
      return groupedApps;
    },
  });
};