import { Wallet, Zap } from "lucide-react";
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
    title: "Version Gratuite",
    description: "Gérez vos abonnements simplement et efficacement",
    icon: createIcon(Wallet),
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    benefits: [
      "Gestion illimitée d'abonnements",
      "Suivi des dépenses mensuelles et annuelles",
      "Stockage des factures",
      "Recommandations personnalisées",
      "Comparaison des applications"
    ]
  },
  {
    title: "Version Premium",
    description: "Automatisation complète et fonctionnalités avancées",
    icon: createIcon(Zap),
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop",
    isPremium: true,
    benefits: [
      "Ajout automatique des abonnements",
      "Scan intelligent des factures (OCR)",
      "Notifications avancées",
      "Gestion multi-utilisateurs",
      "Intégrations (Slack, Google Sheets, etc.)"
    ]
  }
];