import { useQuery } from "@tanstack/react-query";

const PREDEFINED_APPS = {
  "Automatisation": [
    {
      name: "Make",
      description: "Plateforme d'automatisation no-code pour connecter vos applications et automatiser vos workflows",
      price: 9.99,
      website_url: "https://www.make.com",
      category: "Automatisation"
    }
  ],
  "Crypto et finance": [
    {
      name: "Revolut",
      description: "Solution bancaire tout-en-un avec des fonctionnalités crypto et des cartes virtuelles",
      price: 7.99,
      website_url: "https://www.revolut.com",
      category: "Crypto et finance"
    },
    {
      name: "Binance",
      description: "Plateforme d'échange de cryptomonnaies leader avec des outils avancés",
      price: 0,
      website_url: "https://www.binance.com",
      category: "Crypto et finance"
    }
  ],
  "Gestion de projets": [
    {
      name: "ClickUp",
      description: "Plateforme tout-en-un pour gérer projets, tâches et collaboration d'équipe",
      price: 5.99,
      website_url: "https://www.clickup.com",
      category: "Gestion de projets"
    }
  ],
  "Outils de création graphique": [
    {
      name: "Canva",
      description: "Plateforme de design graphique intuitive pour créer des visuels professionnels",
      price: 12.99,
      website_url: "https://www.canva.com",
      category: "Outils de création graphique"
    }
  ],
  "Applications IA": [
    {
      name: "Jasper AI",
      description: "Assistant d'écriture IA pour créer du contenu de qualité rapidement",
      price: 24.99,
      website_url: "https://www.jasper.ai",
      category: "Applications IA"
    }
  ]
};

export const usePromoApps = () => {
  return useQuery({
    queryKey: ['trending-apps'],
    queryFn: async () => {
      console.log("Generating apps data with all categories...");
      
      const groupedApps = {};

      Object.entries(PREDEFINED_APPS).forEach(([category, apps]) => {
        if (!groupedApps[category]) {
          groupedApps[category] = [];
        }

        apps.forEach(app => {
          groupedApps[category].push({
            app: {
              id: Math.random(),
              name: app.name,
              price: app.price,
              description: app.description,
              category: app.category,
              website_url: app.website_url
            },
            promoCode: {
              code: "PROMO2024",
              discount_amount: 20,
              discount_type: "percentage",
              description: "+3 mois EXTRA offerts"
            }
          });
        });
      });

      console.log("Grouped apps by category:", groupedApps);
      return groupedApps;
    },
  });
};