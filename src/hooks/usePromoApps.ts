import { useQuery } from "@tanstack/react-query";

const PREDEFINED_APPS = {
  "Applications Recommandées": [
    {
      app: {
        id: 1,
        name: "Make",
        description: "Plateforme d'automatisation no-code pour connecter vos applications",
        price: 9.99,
        website_url: "https://www.make.com",
        category: "Automatisation",
        features: [
          "Automatisation illimitée",
          "Plus de 1000+ intégrations",
          "Support premium",
          "Templates prêts à l'emploi"
        ]
      },
      promoCode: {
        code: "MAKE2024",
        discount_amount: 20,
        description: "2 mois offerts sur l'abonnement annuel"
      }
    },
    {
      app: {
        id: 2,
        name: "Revolut",
        description: "Solution bancaire tout-en-un avec crypto et trading",
        price: 7.99,
        website_url: "https://www.revolut.com",
        category: "Crypto et finance",
        features: [
          "Cartes virtuelles illimitées",
          "Trading crypto sans frais",
          "Transferts internationaux",
          "Cashback sur achats"
        ]
      },
      promoCode: {
        code: "REVOLUT2024",
        discount_amount: 25,
        description: "3 mois Premium offerts"
      }
    },
    {
      app: {
        id: 3,
        name: "Jasper AI",
        description: "Assistant d'écriture IA pour du contenu de qualité",
        price: 24.99,
        website_url: "https://www.jasper.ai",
        category: "Applications IA",
        features: [
          "Rédaction assistée par IA",
          "Plus de 50+ templates",
          "Support multilingue",
          "Intégration SEO"
        ]
      },
      promoCode: {
        code: "JASPER2024",
        discount_amount: 20,
        description: "20% de réduction à vie"
      }
    },
    {
      app: {
        id: 4,
        name: "Canva",
        description: "Plateforme de design graphique intuitive",
        price: 12.99,
        website_url: "https://www.canva.com",
        category: "Outils de création graphique",
        features: [
          "Millions de templates",
          "Outils de design pro",
          "Collaboration en équipe",
          "Brand Kit personnalisé"
        ]
      },
      promoCode: {
        code: "CANVA2024",
        discount_amount: 45,
        description: "45% de réduction sur l'abonnement Pro"
      }
    },
    {
      app: {
        id: 5,
        name: "Binance",
        description: "La plus grande plateforme d'échange de cryptomonnaies",
        price: 0,
        website_url: "https://www.binance.com",
        category: "Crypto et finance",
        features: [
          "Trading spot et futures",
          "Staking de cryptomonnaies",
          "Paiements P2P",
          "Carte Visa Binance"
        ]
      },
      promoCode: {
        code: "BINANCE2024",
        discount_amount: 10,
        description: "10% de réduction sur les frais de trading"
      }
    },
    {
      app: {
        id: 6,
        name: "ClickUp",
        description: "Plateforme tout-en-un pour la gestion de projets",
        price: 5.99,
        website_url: "https://www.clickup.com",
        category: "Gestion de projets",
        features: [
          "Gestion de tâches avancée",
          "Vues personnalisables",
          "Collaboration en temps réel",
          "Intégrations natives"
        ]
      },
      promoCode: {
        code: "CLICKUP2024",
        discount_amount: 30,
        description: "30% de réduction sur le plan annuel"
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
      return PREDEFINED_APPS;
    },
  });
};