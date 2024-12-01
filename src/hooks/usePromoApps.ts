import { useQuery } from "@tanstack/react-query";

const PREDEFINED_APPS = {
  "Automatisation": [
    {
      app: {
        id: 1,
        name: "Make",
        description: "Plateforme d'automatisation no-code pour connecter vos applications et automatiser vos workflows",
        price: 9.99,
        website_url: "https://www.make.com",
        category: "Automatisation"
      },
      promoCode: {
        code: "PROMO2024",
        discount_amount: 20,
        discount_type: "percentage",
        description: "+3 mois EXTRA offerts"
      }
    }
  ],
  "Crypto et finance": [
    {
      app: {
        id: 2,
        name: "Revolut",
        description: "Solution bancaire tout-en-un avec des fonctionnalités crypto et des cartes virtuelles",
        price: 7.99,
        website_url: "https://www.revolut.com",
        category: "Crypto et finance"
      },
      promoCode: {
        code: "REVOLUT2024",
        discount_amount: 25,
        discount_type: "percentage",
        description: "25% de réduction sur l'abonnement annuel"
      }
    },
    {
      app: {
        id: 3,
        name: "Binance",
        description: "La plus grande plateforme d'échange de cryptomonnaies au monde",
        price: 0,
        website_url: "https://www.binance.com",
        category: "Crypto et finance"
      },
      promoCode: {
        code: "BINANCE2024",
        discount_amount: 10,
        discount_type: "percentage",
        description: "10% de réduction sur les frais de trading"
      }
    }
  ],
  "Gestion de projets": [
    {
      app: {
        id: 4,
        name: "ClickUp",
        description: "Plateforme tout-en-un pour gérer projets, tâches et collaboration d'équipe",
        price: 5.99,
        website_url: "https://www.clickup.com",
        category: "Gestion de projets"
      },
      promoCode: {
        code: "CLICKUP2024",
        discount_amount: 30,
        discount_type: "percentage",
        description: "30% de réduction sur le plan annuel"
      }
    }
  ],
  "Outils de création graphique": [
    {
      app: {
        id: 5,
        name: "Canva",
        description: "Plateforme de design graphique intuitive pour créer des visuels professionnels",
        price: 12.99,
        website_url: "https://www.canva.com",
        category: "Outils de création graphique"
      },
      promoCode: {
        code: "CANVA2024",
        discount_amount: 45,
        discount_type: "percentage",
        description: "45% de réduction sur l'abonnement Pro"
      }
    }
  ],
  "Applications IA": [
    {
      app: {
        id: 6,
        name: "Jasper AI",
        description: "Assistant d'écriture IA pour créer du contenu de qualité rapidement",
        price: 24.99,
        website_url: "https://www.jasper.ai",
        category: "Applications IA"
      },
      promoCode: {
        code: "JASPER2024",
        discount_amount: 20,
        discount_type: "percentage",
        description: "20% de réduction sur le premier mois"
      }
    }
  ]
};

export const usePromoApps = () => {
  console.log("Initializing usePromoApps hook");
  
  return useQuery({
    queryKey: ['trending-apps'],
    queryFn: async () => {
      console.log("Fetching trending apps data...");
      console.log("Apps data structure:", PREDEFINED_APPS);
      return PREDEFINED_APPS;
    },
  });
};