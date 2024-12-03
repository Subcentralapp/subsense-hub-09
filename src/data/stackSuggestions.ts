export interface StackCategory {
  name: string;
  description: string;
  color: string;
  currentStack: string[];
  recommendations: {
    name: string;
    description: string;
    price?: string;
    website_url: string;  // Changed to required field
  }[];
}

export const stackCategories: StackCategory[] = [
  {
    name: "Automatisation",
    description: "Automatisez vos tâches répétitives",
    color: "bg-purple-100",
    currentStack: ["Make", "Airtable", "Google Sheets", "Pipedrive", "DocuSign"],
    recommendations: [
      {
        name: "Integromat",
        description: "Pour ceux qui recherchent des automatisations avancées dans Make.",
        price: "Intégré à Make",
        website_url: "https://www.make.com"
      },
      {
        name: "Coda",
        description: "Combine automatisation et collaboration pour créer des workflows dynamiques avec des données issues de Google Sheets et Airtable.",
        price: "Gratuit/Premium",
        website_url: "https://coda.io"
      },
      {
        name: "Calendly",
        description: "Planifiez automatiquement des réunions en intégrant Airtable ou Google Sheets.",
        price: "Gratuit/Premium",
        website_url: "https://calendly.com"
      },
      {
        name: "Zapier",
        description: "Alternative à Make pour les automatisations simples avec des intégrations rapides.",
        price: "19.99€/mois",
        website_url: "https://zapier.com"
      },
      {
        name: "Tally",
        description: "Automatisation des formulaires connectés à Airtable.",
        price: "Gratuit/Premium",
        website_url: "https://tally.so"
      }
    ]
  },
  {
    name: "Design",
    description: "Créez des designs professionnels",
    color: "bg-pink-100",
    currentStack: ["Adobe Illustrator", "Figma", "Canva", "Procreate", "Blender"],
    recommendations: [
      {
        name: "Adobe Photoshop",
        description: "Pour des retouches photo avancées en complément d'Illustrator.",
        price: "24.99€/mois",
        website_url: ""
      },
      {
        name: "Affinity Designer",
        description: "Alternative économique à Illustrator pour les projets vectoriels.",
        price: "69.99€ - achat unique",
        website_url: ""
      },
      {
        name: "InVision",
        description: "Ajoutez des outils de prototypage et de collaboration à Figma.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Krita",
        description: "Dessin numérique en complément de Procreate pour PC/Mac.",
        price: "Gratuit",
        website_url: ""
      },
      {
        name: "Cinema 4D",
        description: "Pour des animations 3D avancées, complément idéal à Blender.",
        price: "59€/mois",
        website_url: ""
      }
    ]
  },
  {
    name: "Productivité",
    description: "Optimisez votre flux de travail",
    color: "bg-blue-100",
    currentStack: ["Notion", "Trello", "Slack", "Google Calendar", "ClickUp"],
    recommendations: [
      {
        name: "Todoist",
        description: "Gestion personnelle des tâches, intégrable avec Slack et Google Calendar.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Asana",
        description: "Alternative puissante à Trello pour les équipes.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Obsidian",
        description: "Prise de notes avancée avec des fonctionnalités de connectivité, complément à Notion.",
        price: "Gratuit",
        website_url: ""
      },
      {
        name: "Zapier + Slack",
        description: "Automatisez vos notifications Slack avec vos outils de productivité.",
        price: "Variable",
        website_url: ""
      },
      {
        name: "Clockify",
        description: "Suivi du temps et productivité, parfait en complément de Trello ou ClickUp.",
        price: "Gratuit/Premium",
        website_url: ""
      }
    ]
  },
  {
    name: "Marketing Digital",
    description: "Développez votre présence en ligne",
    color: "bg-green-100",
    currentStack: ["HubSpot", "Hootsuite", "SEMrush", "Canva", "ActiveCampaign"],
    recommendations: [
      {
        name: "Buffer",
        description: "Alternative ou complément à Hootsuite pour planifier des posts sur les réseaux sociaux.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Google Analytics",
        description: "Analyse du trafic web, essentiel en complément de SEMrush.",
        price: "Gratuit",
        website_url: ""
      },
      {
        name: "Mailchimp",
        description: "Alternative ou complément à ActiveCampaign pour les petites entreprises.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Mojo",
        description: "Création de contenus vidéo et stories pour les réseaux sociaux, complément à Canva.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Ahrefs",
        description: "Pour des recherches SEO approfondies en complément de SEMrush.",
        price: "99€/mois",
        website_url: ""
      }
    ]
  },
  {
    name: "Intelligence Artificielle",
    description: "Intégrez l'IA dans votre workflow",
    color: "bg-indigo-100",
    currentStack: ["ChatGPT", "Runway ML", "Synthesia", "DALL-E", "Jasper AI"],
    recommendations: [
      {
        name: "MidJourney",
        description: "Génération d'images IA avancées, complément parfait à DALL-E.",
        price: "10$/mois",
        website_url: ""
      },
      {
        name: "DeepL",
        description: "Traduction assistée par IA, utile pour les entreprises internationales.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Descript",
        description: "Édition audio et vidéo basée sur l'IA, complément à Runway ML.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Writesonic",
        description: "Alternative ou complément à Jasper pour les contenus longs (blogs, landing pages).",
        price: "12€/mois",
        website_url: ""
      },
      {
        name: "Whisper AI",
        description: "Transcription audio en texte assistée par l'IA, complément parfait à Synthesia.",
        price: "Open-source",
        website_url: ""
      }
    ]
  },
  {
    name: "Développement Web",
    description: "Créez et déployez des applications web",
    color: "bg-yellow-100",
    currentStack: ["Bubble", "GitHub", "Vercel", "Webflow", "Visual Studio Code"],
    recommendations: [
      {
        name: "Figma",
        description: "Créez des maquettes interactives avant de passer au développement avec Webflow ou Bubble.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Netlify",
        description: "Alternative ou complément à Vercel pour l'hébergement et le déploiement de sites.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Postman",
        description: "Testez vos API en complément de GitHub et Visual Studio Code.",
        price: "Gratuit/Premium",
        website_url: ""
      },
      {
        name: "Sentry",
        description: "Suivi des bugs et des performances en temps réel pour vos projets hébergés sur Vercel.",
        price: "29€/mois",
        website_url: ""
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS moderne pour accélérer le développement front-end avec Webflow ou Visual Studio Code.",
        price: "Gratuit",
        website_url: ""
      }
    ]
  }
];
