import { Application } from "@/types/application";

export const productivityApplications: Application[] = [
  { 
    name: "Microsoft 365", 
    price: 7.00, 
    category: "Productivité", 
    description: "Suite Office et stockage cloud",
    pricing_plans: [
      {
        name: "Personnel",
        price: 7.00,
        features: ["1 utilisateur", "1TB OneDrive", "Applications Office", "Support technique"]
      },
      {
        name: "Famille",
        price: 10.00,
        features: ["6 utilisateurs", "1TB OneDrive/utilisateur", "Applications Office", "Sécurité avancée"]
      },
      {
        name: "Business Basic",
        price: 6.00,
        features: ["Web et mobile uniquement", "1TB OneDrive", "Teams", "Email professionnel"]
      },
      {
        name: "Business Standard",
        price: 12.50,
        features: ["Applications bureau", "1TB OneDrive", "Teams", "Email professionnel"]
      }
    ],
    features: ["Apps Office complètes", "1TB OneDrive", "Collaboration en temps réel", "Apps mobiles"],
    pros: ["Suite complète", "Stockage généreux", "Standard professionnel", "Multi-plateforme"],
    cons: ["Prix élevé pour usage personnel", "Fonctionnalités complexes", "Nécessite apprentissage", "Interface parfois lourde"],
    website_url: "https://www.microsoft.com/microsoft-365",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Microsoft_365_%282022%29.svg/1920px-Microsoft_365_%282022%29.svg.png"
  }
];
