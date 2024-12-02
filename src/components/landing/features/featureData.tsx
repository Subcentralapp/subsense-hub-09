import { BarChart3, Bell, Calendar, CreditCard, FileText, PieChart, Settings, Sparkles, Wallet } from "lucide-react";

export const features = [
  {
    title: "Gestion Intelligente des Abonnements",
    description: "Centralisez et gérez tous vos abonnements en un seul endroit. Suivez vos dépenses, dates de renouvellement et recevez des notifications personnalisées.",
    icon: <Wallet className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    benefits: [
      "Vue d'ensemble claire de tous vos abonnements",
      "Notifications de renouvellement automatiques",
      "Suivi des périodes d'essai"
    ]
  },
  {
    title: "Analyse Financière Détaillée",
    description: "Visualisez et analysez vos dépenses avec des graphiques interactifs et des rapports détaillés pour prendre de meilleures décisions financières.",
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Graphiques interactifs de dépenses",
      "Rapports mensuels personnalisés",
      "Prévisions budgétaires"
    ]
  },
  {
    title: "Gestion des Factures",
    description: "Stockez et organisez toutes vos factures numériquement. Notre système analyse automatiquement vos documents pour en extraire les informations importantes.",
    icon: <FileText className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Stockage sécurisé des factures",
      "Extraction automatique des données",
      "Organisation intelligente"
    ]
  },
  {
    title: "Recommandations Personnalisées",
    description: "Recevez des suggestions d'optimisation basées sur vos habitudes de consommation et découvrez des alternatives plus avantageuses.",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Suggestions d'optimisation personnalisées",
      "Comparaison des offres du marché",
      "Économies potentielles calculées"
    ]
  }
];