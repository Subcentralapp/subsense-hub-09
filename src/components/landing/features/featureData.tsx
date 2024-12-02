import { BarChart3, FileText, Sparkles, Wallet, Users, Bell, Database, Zap } from "lucide-react";
import { ReactNode } from "react";

interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  benefits: string[];
  isPremium?: boolean;
}

const createIcon = (Icon: any) => <Icon className="w-10 h-10 text-primary" />;

export const features: Feature[] = [
  {
    title: "Gestion Centralisée des Abonnements",
    description: "Gérez tous vos abonnements en un seul endroit avec une interface intuitive et claire.",
    icon: createIcon(Wallet),
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    benefits: [
      "Ajout et modification manuelle des abonnements",
      "Organisation intuitive de vos services",
      "Suivi illimité des abonnements",
      "Tableau de bord clair et organisé"
    ]
  },
  {
    title: "Suivi Financier Complet",
    description: "Visualisez et analysez vos dépenses d'abonnements avec des outils puissants et gratuits.",
    icon: createIcon(BarChart3),
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Visualisation des coûts mensuels et annuels",
      "Graphiques d'évolution des dépenses",
      "Échéancier des prélèvements",
      "Stockage des factures"
    ]
  },
  {
    title: "Recommandations Intelligentes",
    description: "Découvrez des alternatives plus économiques et des offres promotionnelles adaptées à vos besoins.",
    icon: createIcon(Sparkles),
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Suggestions d'abonnements similaires",
      "Découverte d'offres promotionnelles",
      "Comparaison des applications",
      "Remises négociées avec nos partenaires"
    ]
  },
  {
    title: "Automatisation Complète (Premium)",
    description: "Après le financement, profitez d'une gestion automatisée de vos abonnements grâce à l'IA.",
    icon: createIcon(Zap),
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2940&auto=format&fit=crop",
    isPremium: true,
    benefits: [
      "Ajout automatique via scan d'emails",
      "OCR pour les factures",
      "Détection automatique des abonnements",
      "Synchronisation avec des outils tiers"
    ]
  },
  {
    title: "Notifications Avancées (Premium)",
    description: "Un système intelligent de notifications pour ne jamais manquer une échéance importante.",
    icon: createIcon(Bell),
    image: "https://images.unsplash.com/photo-1586892478025-2b5472316ea4?q=80&w=2940&auto=format&fit=crop",
    isPremium: true,
    benefits: [
      "Alertes de renouvellement automatiques",
      "Notifications de dépassement de budget",
      "Rappels personnalisés",
      "Intégration avec Slack"
    ]
  },
  {
    title: "Gestion Multi-utilisateurs (Premium)",
    description: "Gérez les abonnements en équipe ou en famille avec des profils multiples.",
    icon: createIcon(Users),
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2940&auto=format&fit=crop",
    isPremium: true,
    benefits: [
      "Profils familiaux ou professionnels",
      "Partage des abonnements",
      "Suivi par utilisateur ou groupe",
      "Gestion des accès"
    ]
  }
];