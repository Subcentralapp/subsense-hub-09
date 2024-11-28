import { Application } from "@/types/application";

export const fallbackApplications: Application[] = [
  // Streaming Vidéo
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
  },
  
  // Streaming Musical
  { 
    name: "Spotify", 
    price: 10.99, 
    category: "Streaming Musical", 
    description: "Musique et podcasts en streaming",
    pricing_plans: [
      {
        name: "Gratuit",
        price: 0,
        features: ["Avec publicité", "Lecture aléatoire", "Qualité audio normale", "Mode mobile uniquement"]
      },
      {
        name: "Premium Solo",
        price: 10.99,
        features: ["Sans publicité", "Lecture à la demande", "Qualité audio supérieure", "Téléchargement hors-ligne"]
      },
      {
        name: "Premium Duo",
        price: 14.99,
        features: ["2 comptes Premium", "Duo Mix", "Sans publicité", "Téléchargement hors-ligne"]
      },
      {
        name: "Premium Famille",
        price: 17.99,
        features: ["6 comptes Premium", "Contrôle parental", "Spotify Kids", "Sans publicité"]
      }
    ],
    features: ["Qualité jusqu'à 320kbps", "Mode hors ligne", "Crossfade", "Equalizer"],
    pros: ["Large catalogue", "Excellentes playlists", "Algorithme de recommandation", "Application multi-plateforme"],
    cons: ["Qualité audio limitée sur le forfait standard", "Rémunération des artistes", "Pas de lyrics sur tous les titres"],
    website_url: "https://www.spotify.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/1920px-Spotify_logo_without_text.svg.png"
  },
  { 
    name: "Apple Music", 
    price: 10.99, 
    category: "Streaming Musical", 
    description: "Service de streaming musical d'Apple",
    pricing_plans: [
      {
        name: "Étudiant",
        price: 5.99,
        features: ["Audio sans perte", "Audio spatial", "Lyrics en temps réel", "Sans publicité"]
      },
      {
        name: "Individuel",
        price: 10.99,
        features: ["Audio sans perte", "Audio spatial", "Lyrics en temps réel", "Sans publicité"]
      },
      {
        name: "Famille",
        price: 16.99,
        features: ["Jusqu'à 6 utilisateurs", "Audio sans perte", "Audio spatial", "Contrôle parental"]
      }
    ],
    features: ["Audio sans perte", "Audio spatial", "Lyrics en temps réel", "Radio en direct"],
    pros: ["Qualité audio supérieure", "Intégration écosystème Apple", "Bibliothèque personnelle illimitée", "Radio Apple Music"],
    cons: ["Interface moins intuitive", "Moins social que Spotify", "Recommandations moins précises", "Nécessite iTunes sur Windows"],
    website_url: "https://www.apple.com/apple-music/",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Apple_Music_logo.svg/1920px-Apple_Music_logo.svg.png"
  },
  
  // Gaming
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
  },
  
  // Productivité
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
  },
  
  // Éducation
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
  },
  
  // Bien-être
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
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Calm_logo.svg/1920px-Calm_logo.svg.png"
  }
];