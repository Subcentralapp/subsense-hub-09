import { Application } from "@/types/application";

export const gamingApplications: Application[] = [
  { 
    name: "Xbox Game Pass", 
    price: 12.99, 
    category: "Gaming", 
    description: "Bibliothèque de jeux Xbox et PC",
    pricing_plans: [
      {
        name: "PC Game Pass",
        price: 9.99,
        features: ["Accès aux jeux sur PC", "EA Play inclus", "Nouveaux jeux Day One", "Réductions exclusives"]
      },
      {
        name: "Console Game Pass",
        price: 10.99,
        features: ["Accès aux jeux sur Xbox", "Nouveaux jeux Day One", "Réductions exclusives"]
      },
      {
        name: "Game Pass Ultimate",
        price: 14.99,
        features: ["PC + Console + Cloud", "Xbox Live Gold inclus", "EA Play inclus", "Avantages exclusifs"]
      }
    ],
    features: ["Accès à +100 jeux", "Cloud gaming", "EA Play inclus", "Jeux day-one"],
    pros: ["Excellent rapport qualité/prix", "Nouveautés régulières", "Jeux Microsoft day-one", "Cross-platform"],
    cons: ["Certains jeux quittent le service", "Nécessite une bonne connexion", "Pas tous les gros titres", "Prix variable selon région"],
    website_url: "https://www.xbox.com/gamepass",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Xbox_Game_Pass_logo.svg/1920px-Xbox_Game_Pass_logo.svg.png"
  }
];
