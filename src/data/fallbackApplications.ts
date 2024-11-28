import { Application } from "@/types/application";

export const fallbackApplications: Application[] = [
  // Streaming Vidéo
  { 
    name: "Netflix", 
    price: 15.49, 
    category: "Streaming Vidéo", 
    description: "Films, séries et documentaires en streaming",
    features: ["Streaming HD/4K", "Téléchargement hors-ligne", "Multi-écrans", "Profils personnalisés"],
    pros: ["Large catalogue", "Productions originales de qualité", "Interface intuitive", "Recommandations personnalisées"],
    cons: ["Prix en augmentation", "Catalogue variable selon les régions", "Pas de contenu en direct", "Certains contenus partent de la plateforme"]
  },
  { 
    name: "Disney+", 
    price: 8.99, 
    category: "Streaming Vidéo", 
    description: "Contenu Disney, Marvel, Star Wars et plus",
    features: ["Streaming 4K HDR", "7 profils", "100 téléchargements par appareil", "GroupWatch"],
    pros: ["Catalogue familial", "Franchises populaires", "Prix compétitif", "Pas de publicité"],
    cons: ["Catalogue plus limité", "Moins de contenus adultes", "Sorties moins fréquentes", "Interface parfois lente"]
  },
  
  // Streaming Musical
  { 
    name: "Spotify", 
    price: 10.99, 
    category: "Streaming Musical", 
    description: "Musique et podcasts en streaming",
    features: ["Qualité jusqu'à 320kbps", "Mode hors ligne", "Crossfade", "Equalizer"],
    pros: ["Large catalogue", "Excellentes playlists", "Algorithme de recommandation", "Application multi-plateforme"],
    cons: ["Qualité audio limitée sur le forfait standard", "Rémunération des artistes", "Pas de lyrics sur tous les titres"]
  },
  { 
    name: "Apple Music", 
    price: 10.99, 
    category: "Streaming Musical", 
    description: "Service de streaming musical d'Apple",
    features: ["Audio sans perte", "Audio spatial", "Lyrics en temps réel", "Radio en direct"],
    pros: ["Qualité audio supérieure", "Intégration écosystème Apple", "Bibliothèque personnelle illimitée"],
    cons: ["Interface moins intuitive", "Moins social que Spotify", "Recommandations moins précises"]
  },
  
  // Gaming
  { 
    name: "Xbox Game Pass", 
    price: 12.99, 
    category: "Gaming", 
    description: "Bibliothèque de jeux Xbox et PC",
    features: ["Accès à +100 jeux", "Cloud gaming", "EA Play inclus", "Jeux day-one"],
    pros: ["Excellent rapport qualité/prix", "Nouveautés régulières", "Jeux Microsoft day-one", "Cross-platform"],
    cons: ["Certains jeux quittent le service", "Nécessite une bonne connexion", "Pas tous les gros titres"]
  },
  
  // Productivité
  { 
    name: "Microsoft 365", 
    price: 7.00, 
    category: "Productivité", 
    description: "Suite Office et stockage cloud",
    features: ["Apps Office complètes", "1TB OneDrive", "Collaboration en temps réel", "Apps mobiles"],
    pros: ["Suite complète", "Stockage généreux", "Standard professionnel", "Multi-plateforme"],
    cons: ["Prix élevé pour usage personnel", "Fonctionnalités complexes", "Nécessite apprentissage"]
  },
  
  // Éducation
  { 
    name: "Duolingo Plus", 
    price: 12.99, 
    category: "Éducation", 
    description: "Apprentissage des langues",
    features: ["Pas de publicités", "Leçons illimitées", "Exercices de révision", "Mode hors ligne"],
    pros: ["Apprentissage ludique", "Nombreuses langues", "Progression adaptative", "Prix abordable"],
    cons: ["Pas assez formel", "Vocabulaire limité", "Expressions parfois étranges"]
  },
  
  // Bien-être
  { 
    name: "Calm", 
    price: 14.99, 
    category: "Bien-être", 
    description: "Méditation et sommeil",
    features: ["Méditations guidées", "Histoires pour dormir", "Musique relaxante", "Exercices respiratoires"],
    pros: ["Contenu de qualité", "Voix apaisantes", "Variété des programmes", "Interface zen"],
    cons: ["Prix élevé", "Contenu français limité", "Certains contenus répétitifs"]
  }
];