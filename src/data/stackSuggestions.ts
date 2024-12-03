interface StackCategory {
  name: string;
  description: string;
  color: string;
  recommendations: {
    name: string;
    price: string;
    description: string;
    website_url: string | null;
  }[];
}

export const stackCategories: StackCategory[] = [
  {
    name: "Automatisation et développement sans code",
    description: "Automatisez vos tâches et créez sans coder",
    color: "blue",
    recommendations: [
      {
        name: "Zapier",
        price: "19.99",
        description: "Automatisez vos tâches répétitives entre vos applications",
        website_url: "https://zapier.com"
      },
      {
        name: "Make (Integromat)",
        price: "9.99",
        description: "Plateforme d'automatisation visuelle puissante",
        website_url: "https://www.make.com"
      },
      {
        name: "Automate.io",
        price: "9.00",
        description: "Automatisez votre travail avec des intégrations simples",
        website_url: "https://automate.io"
      },
      {
        name: "Unito",
        price: "10.00",
        description: "Connectez vos outils pour une collaboration fluide",
        website_url: "https://unito.io"
      },
      {
        name: "Pipedream",
        price: "0.00",
        description: "Intégrez vos API et automatisez des workflows",
        website_url: "https://pipedream.com"
      },
    ]
  },
  {
    name: "Gestion de projet",
    description: "Gérez vos projets efficacement",
    color: "green",
    recommendations: [
      {
        name: "Trello",
        price: "0.00",
        description: "Gestion de projet visuelle avec des tableaux",
        website_url: "https://trello.com"
      },
      {
        name: "Asana",
        price: "10.99",
        description: "Planifiez, organisez et gérez vos projets",
        website_url: "https://asana.com"
      },
      {
        name: "Notion",
        price: "4.00",
        description: "Espace de travail tout-en-un pour notes et projets",
        website_url: "https://www.notion.so"
      },
      {
        name: "Monday.com",
        price: "8.00",
        description: "Gérez votre équipe avec des workflows personnalisés",
        website_url: "https://monday.com"
      },
      {
        name: "Basecamp",
        price: "99.00",
        description: "Outil de collaboration et de gestion de projet",
        website_url: "https://basecamp.com"
      },
    ]
  },
  {
    name: "Communication",
    description: "Communiquez efficacement en équipe",
    color: "purple",
    recommendations: [
      {
        name: "Slack",
        price: "6.67",
        description: "Communication d'équipe instantanée",
        website_url: "https://slack.com"
      },
      {
        name: "Microsoft Teams",
        price: "5.00",
        description: "Outil de collaboration et de communication",
        website_url: "https://www.microsoft.com/en/microsoft-teams/group-chat-software"
      },
      {
        name: "Zoom",
        price: "14.99",
        description: "Visioconférence et webinaires",
        website_url: "https://zoom.us"
      },
      {
        name: "Discord",
        price: "0.00",
        description: "Plateforme de communication pour les communautés",
        website_url: "https://discord.com"
      },
      {
        name: "Google Meet",
        price: "0.00",
        description: "Communiquez par vidéo à travers le monde",
        website_url: "https://meet.google.com"
      },
    ]
  },
  {
    name: "Gestion des tâches",
    description: "Organisez et suivez vos tâches",
    color: "orange",
    recommendations: [
      {
        name: "Todoist",
        price: "3.00",
        description: "Gestion de tâches simple et efficace",
        website_url: "https://todoist.com"
      },
      {
        name: "ClickUp",
        price: "0.00",
        description: "Gestion de projets et de tâches tout-en-un",
        website_url: "https://clickup.com"
      },
      {
        name: "Wunderlist",
        price: "0.00",
        description: "Créez et partagez des listes de tâches",
        website_url: "https://www.wunderlist.com"
      },
      {
        name: "Microsoft To Do",
        price: "0.00",
        description: "Application de gestion de tâches par Microsoft",
        website_url: "https://todo.microsoft.com"
      },
      {
        name: "Any.do",
        price: "0.00",
        description: "Application de gestion de tâches et agenda",
        website_url: "https://www.any.do"
      },
    ]
  },
];