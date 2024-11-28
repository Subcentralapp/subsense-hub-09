import { Application } from "@/types/application";

export const fallbackApplications: Application[] = [
  // Streaming Vidéo
  { name: "Netflix", price: 15.49, category: "Streaming Vidéo", description: "Films, séries et documentaires en streaming" },
  { name: "Disney+", price: 8.99, category: "Streaming Vidéo", description: "Contenu Disney, Marvel, Star Wars et plus" },
  { name: "Prime Video", price: 6.99, category: "Streaming Vidéo", description: "Service de streaming d'Amazon" },
  { name: "Canal+", price: 24.99, category: "Streaming Vidéo", description: "Chaînes TV et contenus exclusifs" },
  { name: "Apple TV+", price: 9.99, category: "Streaming Vidéo", description: "Séries et films originaux Apple" },
  { name: "OCS", price: 10.99, category: "Streaming Vidéo", description: "Films et séries en streaming" },
  { name: "Paramount+", price: 7.99, category: "Streaming Vidéo", description: "Contenu Paramount, CBS, MTV et plus" },
  
  // Streaming Musical
  { name: "Spotify", price: 10.99, category: "Streaming Musical", description: "Musique et podcasts en streaming" },
  { name: "Apple Music", price: 10.99, category: "Streaming Musical", description: "Service de streaming musical d'Apple" },
  { name: "Amazon Music", price: 9.99, category: "Streaming Musical", description: "Service musical d'Amazon" },
  { name: "YouTube Music", price: 9.99, category: "Streaming Musical", description: "Musique et clips en streaming" },
  { name: "Tidal", price: 19.99, category: "Streaming Musical", description: "Streaming musical haute-fidélité" },
  
  // Gaming
  { name: "Xbox Game Pass", price: 12.99, category: "Gaming", description: "Bibliothèque de jeux Xbox et PC" },
  { name: "PlayStation Plus", price: 8.99, category: "Gaming", description: "Service gaming de Sony" },
  { name: "Nintendo Switch Online", price: 3.99, category: "Gaming", description: "Gaming en ligne Nintendo" },
  { name: "EA Play", price: 4.99, category: "Gaming", description: "Jeux Electronic Arts" },
  { name: "GeForce Now", price: 9.99, category: "Gaming", description: "Cloud gaming NVIDIA" },
  
  // Productivité
  { name: "Microsoft 365", price: 7.00, category: "Productivité", description: "Suite Office et stockage cloud" },
  { name: "Google One", price: 1.99, category: "Productivité", description: "Stockage Google supplémentaire" },
  { name: "Dropbox", price: 11.99, category: "Productivité", description: "Stockage et partage de fichiers" },
  { name: "Adobe Creative Cloud", price: 59.99, category: "Productivité", description: "Suite créative complète" },
  { name: "Notion", price: 8.00, category: "Productivité", description: "Outil de productivité tout-en-un" },
  
  // Éducation
  { name: "Duolingo Plus", price: 12.99, category: "Éducation", description: "Apprentissage des langues" },
  { name: "Skillshare", price: 15.00, category: "Éducation", description: "Cours créatifs en ligne" },
  { name: "Coursera Plus", price: 59.00, category: "Éducation", description: "Formations universitaires" },
  { name: "MasterClass", price: 15.00, category: "Éducation", description: "Cours par des experts" },
  
  // Bien-être
  { name: "Calm", price: 14.99, category: "Bien-être", description: "Méditation et sommeil" },
  { name: "Headspace", price: 12.99, category: "Bien-être", description: "Méditation guidée" },
  { name: "Fitbod", price: 12.99, category: "Bien-être", description: "Entraînement personnalisé" },
  { name: "MyFitnessPal", price: 9.99, category: "Bien-être", description: "Suivi nutritionnel" }
];