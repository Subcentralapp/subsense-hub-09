import { motion } from "framer-motion";
import { CategoryRecommendation } from "@/types/recommendation";
import { StyledCategoryCard } from "./StyledCategoryCard";

interface CategoryCardProps {
  rec: CategoryRecommendation;
  onExplore: (category: string) => void;
}

export const CategoryCard = ({ rec, onExplore }: CategoryCardProps) => {
  // Featured apps data with their respective URLs
  const featuredApps = {
    "Productivité": {
      name: "ClickUp",
      category: "Productivité",
      description: "Plateforme tout-en-un pour gérer projets, tâches et collaboration d'équipe",
      price: 5.99,
      hasPromo: true,
      website_url: "https://www.clickup.com"
    },
    "Finance": {
      name: "Revolut",
      category: "Finance",
      description: "Solution bancaire tout-en-un avec des fonctionnalités crypto et des cartes virtuelles",
      price: 7.99,
      hasPromo: true,
      website_url: "https://www.revolut.com"
    },
    "Intelligence Artificielle": {
      name: "Jasper AI",
      category: "Intelligence Artificielle",
      description: "Assistant d'écriture IA pour créer du contenu de qualité rapidement",
      price: 24.99,
      hasPromo: true,
      website_url: "https://www.jasper.ai"
    },
    "Design": {
      name: "Canva",
      category: "Design",
      description: "Plateforme de design graphique intuitive pour créer des visuels professionnels",
      price: 12.99,
      hasPromo: true,
      website_url: "https://www.canva.com"
    },
    "Crypto": {
      name: "Binance",
      category: "Crypto",
      description: "La plus grande plateforme d'échange de cryptomonnaies",
      price: 0,
      hasPromo: true,
      website_url: "https://www.binance.com"
    },
    "Automatisation": {
      name: "Make",
      category: "Automatisation",
      description: "Plateforme d'automatisation no-code pour connecter vos applications",
      price: 9.99,
      hasPromo: true,
      website_url: "https://www.make.com"
    }
  };

  // Find the featured app for this category
  const featuredApp = featuredApps[rec.category as keyof typeof featuredApps] || featuredApps["Productivité"];

  return (
    <StyledCategoryCard
      app={featuredApp}
      onExplore={() => window.open(featuredApp.website_url, '_blank')}
    />
  );
};