import { Application } from "@/types/application";

export const aiApplications: Application[] = [
  {
    name: "ChatGPT",
    price: 20,
    category: "Intelligence Artificielle",
    description: "Assistant IA conversationnel par OpenAI",
    pricing_plans: [
      {
        name: "Gratuit",
        price: 0,
        features: ["Accès au modèle GPT-3.5", "Conversations basiques", "Temps de réponse standard"]
      },
      {
        name: "Plus",
        price: 20,
        features: [
          "Accès à GPT-4",
          "Temps de réponse plus rapides",
          "Accès prioritaire aux nouvelles fonctionnalités",
          "Utilisation aux heures de pointe"
        ]
      }
    ],
    features: ["Chat IA avancé", "Génération de texte", "Analyse de données", "Support multilingue"],
    pros: ["IA très performante", "Interface intuitive", "Mises à jour régulières", "Large communauté"],
    cons: ["Prix élevé", "Nécessite une connexion internet", "Peut parfois être indisponible"],
    website_url: "https://chat.openai.com",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
  },
  {
    name: "Perplexity AI",
    price: 20,
    category: "Intelligence Artificielle",
    description: "Moteur de recherche alimenté par l'IA",
    pricing_plans: [
      {
        name: "Gratuit",
        price: 0,
        features: ["Recherches de base", "Modèle standard", "Usage limité"]
      },
      {
        name: "Pro",
        price: 20,
        features: [
          "Modèles IA avancés",
          "Recherches illimitées",
          "Fonctionnalités premium",
          "Support prioritaire"
        ]
      }
    ],
    features: ["Recherche IA", "Citations sources", "Réponses détaillées", "Interface moderne"],
    pros: ["Précision des réponses", "Citations fiables", "Interface claire", "Mises à jour fréquentes"],
    cons: ["Limite de requêtes en version gratuite", "Prix premium", "Dépendance à la connexion internet"],
    website_url: "https://www.perplexity.ai",
    logo_url: "https://www.perplexity.ai/favicon.ico"
  }
];