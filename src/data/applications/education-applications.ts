import { Application } from "@/types/application";

export const educationApplications: Application[] = [
  { 
    name: "Duolingo Plus", 
    price: 12.99, 
    category: "Éducation", 
    description: "Apprentissage des langues",
    pricing_plans: [
      {
        name: "Gratuit",
        price: 0,
        features: ["Leçons de base", "Avec publicités", "5 vies", "Progression limitée"]
      },
      {
        name: "Super",
        price: 12.99,
        features: ["Sans publicité", "Vies illimitées", "Mode hors-ligne", "Progression personnalisée"]
      },
      {
        name: "Famille",
        price: 19.99,
        features: ["Jusqu'à 6 comptes", "Sans publicité", "Vies illimitées", "Progression familiale"]
      }
    ],
    features: ["Pas de publicités", "Leçons illimitées", "Exercices de révision", "Mode hors ligne"],
    pros: ["Apprentissage ludique", "Nombreuses langues", "Progression adaptative", "Prix abordable"],
    cons: ["Pas assez formel", "Vocabulaire limité", "Expressions parfois étranges", "Notifications insistantes"],
    website_url: "https://www.duolingo.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Duolingo_owl.svg/1920px-Duolingo_owl.svg.png"
  }
];
