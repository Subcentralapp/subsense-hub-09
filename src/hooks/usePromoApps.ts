import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface Application {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  website_url: string | null;
}

interface PromoCode {
  code: string;
  discount_amount: number;
  discount_type: string | null;
  description: string | null;
}

interface GroupedApp {
  app: Application;
  promoCode: PromoCode;
}

const PREDEFINED_APPS = {
  "Automatisation": {
    name: "Make",
    description: "Plateforme d'automatisation no-code pour connecter vos applications",
    price: 29.99,
    website_url: "https://www.make.com"
  },
  "Crypto et finance": [
    {
      name: "Revolut",
      description: "Application bancaire tout-en-un avec support des cryptomonnaies",
      price: 19.99,
      website_url: "https://www.revolut.com"
    },
    {
      name: "Binance",
      description: "Plus grande plateforme d'échange de cryptomonnaies au monde",
      price: 0,
      website_url: "https://www.binance.com"
    }
  ],
  "Gestion de projets": {
    name: "ClickUp",
    description: "Plateforme tout-en-un pour la gestion de projets et la collaboration",
    price: 24.99,
    website_url: "https://www.clickup.com"
  },
  "Outils de création graphique": {
    name: "Canva",
    description: "Outil de design graphique en ligne pour tous",
    price: 14.99,
    website_url: "https://www.canva.com"
  },
  "Applications IA": {
    name: "Jasper AI",
    description: "Assistant d'écriture alimenté par l'IA",
    price: 39.99,
    website_url: "https://www.jasper.ai"
  }
};

export const usePromoApps = () => {
  return useQuery({
    queryKey: ['trending-apps'],
    queryFn: async () => {
      console.log("Generating predefined apps data...");
      
      const groupedApps: Record<string, GroupedApp[]> = {};

      // Traitement des applications prédéfinies
      Object.entries(PREDEFINED_APPS).forEach(([category, appData]) => {
        if (!groupedApps[category]) {
          groupedApps[category] = [];
        }

        if (Array.isArray(appData)) {
          // Pour les catégories avec plusieurs apps (Crypto et finance)
          appData.forEach(app => {
            groupedApps[category].push({
              app: {
                id: Math.random(), // ID temporaire
                name: app.name,
                price: app.price,
                description: app.description,
                category: category,
                website_url: app.website_url
              },
              promoCode: {
                code: "PROMO2024",
                discount_amount: 20,
                discount_type: "percentage",
                description: "20% de réduction"
              }
            });
          });
        } else {
          // Pour les catégories avec une seule app
          groupedApps[category].push({
            app: {
              id: Math.random(), // ID temporaire
              name: appData.name,
              price: appData.price,
              description: appData.description,
              category: category,
              website_url: appData.website_url
            },
            promoCode: {
              code: "PROMO2024",
              discount_amount: 20,
              discount_type: "percentage",
              description: "20% de réduction"
            }
          });
        }
      });

      console.log("Grouped apps by category:", groupedApps);
      return groupedApps;
    },
  });
};