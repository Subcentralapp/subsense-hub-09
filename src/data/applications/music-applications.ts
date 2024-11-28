import { Application } from "@/types/application";

export const musicApplications: Application[] = [
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
  }
];
