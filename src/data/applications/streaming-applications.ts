import { Application } from "@/types/application";

export const streamingApplications: Application[] = [
  { 
    name: "Netflix", 
    price: 15.49, 
    category: "Streaming Vidéo", 
    description: "Films, séries et documentaires en streaming",
    features: ["Streaming HD/4K", "Téléchargement hors-ligne", "Multi-écrans", "Profils personnalisés"],
    pricing_plans: [
      {
        name: "Essentiel avec pub",
        price: 5.99,
        features: ["Publicités", "HD 720p", "1 appareil à la fois", "Téléchargements sur 1 appareil"]
      },
      {
        name: "Essentiel",
        price: 10.99,
        features: ["Sans publicité", "HD 1080p", "1 appareil à la fois", "Téléchargements sur 1 appareil"]
      },
      {
        name: "Standard",
        price: 13.49,
        features: ["Sans publicité", "Full HD 1080p", "2 appareils à la fois", "Téléchargements sur 2 appareils"]
      },
      {
        name: "Premium",
        price: 19.99,
        features: ["Sans publicité", "Ultra HD 4K", "4 appareils à la fois", "Téléchargements sur 6 appareils", "Netflix Spatial Audio"]
      }
    ],
    pros: ["Large catalogue", "Productions originales de qualité", "Interface intuitive", "Recommandations personnalisées"],
    cons: ["Prix en augmentation", "Catalogue variable selon les régions", "Pas de contenu en direct", "Certains contenus partent de la plateforme"],
    website_url: "https://www.netflix.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
  },
  { 
    name: "Disney+", 
    price: 8.99, 
    category: "Streaming Vidéo", 
    description: "Contenu Disney, Marvel, Star Wars et plus",
    pricing_plans: [
      {
        name: "Standard avec pub",
        price: 5.99,
        features: ["Avec publicité", "Full HD 1080p", "2 appareils en simultané", "Téléchargements sur 2 appareils"]
      },
      {
        name: "Standard",
        price: 8.99,
        features: ["Sans publicité", "Full HD 1080p", "2 appareils en simultané", "Téléchargements sur 2 appareils"]
      },
      {
        name: "Premium",
        price: 11.99,
        features: ["Sans publicité", "Ultra HD 4K", "4 appareils en simultané", "Téléchargements sur 4 appareils", "Dolby Atmos"]
      }
    ],
    features: ["Streaming 4K HDR", "7 profils", "100 téléchargements par appareil", "GroupWatch"],
    pros: ["Catalogue familial", "Franchises populaires", "Prix compétitif", "Pas de publicité"],
    cons: ["Catalogue plus limité", "Moins de contenus adultes", "Sorties moins fréquentes", "Interface parfois lente"],
    website_url: "https://www.disneyplus.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/1920px-Disney%2B_logo.svg.png"
  }
];
