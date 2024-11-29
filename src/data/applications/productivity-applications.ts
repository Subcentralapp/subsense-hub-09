import { Application } from "@/types/application";

export const productivityApplications: Application[] = [
  {
    name: "Airtable",
    price: 10.00,
    category: "Productivité",
    description: "Base de données collaborative et outil de gestion de projet",
    pricing_plans: [
      {
        name: "Gratuit",
        price: 0,
        features: ["Base illimitée", "1000 enregistrements par base", "Interface intuitive"]
      },
      {
        name: "Plus",
        price: 10,
        features: ["5000 enregistrements par base", "Extensions", "Vues personnalisées", "Support prioritaire"]
      }
    ],
    features: ["Bases de données", "Vues personnalisables", "Automatisations", "Intégrations"],
    pros: ["Interface intuitive", "Flexible", "Collaboratif", "Nombreuses intégrations"],
    cons: ["Prix élevé pour équipes", "Courbe d'apprentissage", "Fonctionnalités limitées version gratuite"],
    website_url: "https://www.airtable.com",
    logo_url: "https://logo.clearbit.com/airtable.com"
  },
  {
    name: "DeepL Pro",
    price: 29.99,
    category: "Productivité",
    description: "Service de traduction professionnelle alimenté par l'IA",
    pricing_plans: [
      {
        name: "Gratuit",
        price: 0,
        features: ["Traduction de base", "Limite de caractères", "Formats limités"]
      },
      {
        name: "Pro",
        price: 29.99,
        features: ["Traduction illimitée", "Tous les formats", "API disponible", "Support prioritaire"]
      }
    ],
    features: ["Traduction IA avancée", "Support multilingue", "Interface professionnelle", "API disponible"],
    pros: ["Qualité supérieure", "Interface intuitive", "Rapide", "Support technique"],
    cons: ["Prix élevé", "Nécessite internet", "Limite sur version gratuite"],
    website_url: "https://www.deepl.com",
    logo_url: "https://logo.clearbit.com/deepl.com"
  },
  {
    name: "Dropbox Plus",
    price: 11.99,
    category: "Productivité",
    description: "Stockage cloud et collaboration",
    pricing_plans: [
      {
        name: "Basic",
        price: 0,
        features: ["2 Go de stockage", "Synchronisation basique", "Partage limité"]
      },
      {
        name: "Plus",
        price: 11.99,
        features: ["2 To de stockage", "Synchronisation avancée", "Backup automatique"]
      },
      {
        name: "Professional",
        price: 19.99,
        features: ["3 To de stockage", "Signature électronique", "Transfert de fichiers volumineux"]
      }
    ],
    features: ["Stockage cloud", "Synchronisation", "Partage de fichiers", "Collaboration"],
    pros: ["Interface simple", "Multi-plateforme", "Synchronisation rapide", "Sécurisé"],
    cons: ["Espace limité version gratuite", "Prix des versions pro", "Dépendance internet"],
    website_url: "https://www.dropbox.com",
    logo_url: "https://logo.clearbit.com/dropbox.com"
  },
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
    logo_url: "https://logo.clearbit.com/microsoft.com"
  }
];
