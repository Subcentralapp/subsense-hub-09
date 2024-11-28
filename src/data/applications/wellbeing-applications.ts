import { Application } from "@/types/application";

export const wellbeingApplications: Application[] = [
  { 
    name: "Calm", 
    price: 14.99, 
    category: "Bien-être", 
    description: "Méditation et sommeil",
    pricing_plans: [
      {
        name: "Mensuel",
        price: 14.99,
        features: ["Accès complet", "Méditations guidées", "Histoires pour dormir", "Musique relaxante"]
      },
      {
        name: "Annuel",
        price: 69.99,
        features: ["Accès complet", "Prix réduit", "Méditations guidées", "Contenu exclusif"]
      },
      {
        name: "Famille",
        price: 99.99,
        features: ["6 comptes", "Prix annuel", "Accès complet", "Contenu pour enfants"]
      }
    ],
    features: ["Méditations guidées", "Histoires pour dormir", "Musique relaxante", "Exercices respiratoires"],
    pros: ["Contenu de qualité", "Voix apaisantes", "Variété des programmes", "Interface zen"],
    cons: ["Prix élevé", "Contenu français limité", "Certains contenus répétitifs", "Téléchargements limités"],
    website_url: "https://www.calm.com",
    logo_url: "https://logo.clearbit.com/calm.com"
  }
];