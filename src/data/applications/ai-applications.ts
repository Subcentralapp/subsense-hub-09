import { Application } from "@/types/application";

export const aiApplications: Application[] = [
  {
    name: "ChatGPT",
    price: 20,
    category: "Intelligence Artificielle",
    description: "Assistant IA conversationnel par OpenAI",
    pricing_plans: [
      {
        name: "Plus",
        price: 20,
        features: [
          "Accès à GPT-4",
          "Temps de réponse plus rapides",
          "Accès prioritaire aux nouvelles fonctionnalités"
        ]
      }
    ]
  },
  {
    name: "Perplexity",
    price: 20,
    category: "Intelligence Artificielle",
    description: "Moteur de recherche alimenté par l'IA avec sources citées",
    pricing_plans: [
      {
        name: "Pro",
        price: 20,
        features: [
          "Modèles IA avancés",
          "Recherches illimitées",
          "Support prioritaire"
        ]
      }
    ]
  }
];