import { Application } from "@/types/application";

export const foodApplications: Application[] = [
  {
    name: "Deliveroo Plus",
    price: 5.99,
    category: "Alimentation",
    description: "Service de livraison de repas",
    pricing_plans: [
      {
        name: "Silver",
        price: 5.99,
        features: ["Livraison gratuite", "Réductions exclusives", "Support prioritaire"]
      },
      {
        name: "Plus",
        price: 9.99,
        features: ["Livraison gratuite", "Réductions exclusives", "Support prioritaire", "Avantages partenaires"]
      }
    ],
    features: ["Large choix de restaurants", "Suivi en temps réel", "Paiement sécurisé", "Programme de fidélité"],
    pros: ["Rapidité de livraison", "Choix varié", "Interface intuitive", "Service client réactif"],
    cons: ["Frais de service", "Prix plus élevés", "Zone de livraison limitée"],
    website_url: "https://www.deliveroo.fr",
    logo_url: "https://logo.clearbit.com/deliveroo.com"
  }
];