import { motion } from "framer-motion";
import { CategoryRecommendation } from "@/types/recommendation";
import { StyledCategoryCard } from "./StyledCategoryCard";

interface CategoryCardProps {
  rec: CategoryRecommendation;
  onExplore: (category: string) => void;
}

export const CategoryCard = ({ rec, onExplore }: CategoryCardProps) => {
  // Featured apps data with their respective URLs
  const featuredApps = [
    {
      name: "Make",
      category: "Automatisation",
      description: "Plateforme d'automatisation no-code pour connecter vos applications et automatiser vos workflows",
      price: 9.99,
      hasPromo: true,
      website_url: "https://www.make.com"
    },
    {
      name: "Revolut",
      category: "Crypto et finance",
      description: "Solution bancaire tout-en-un avec des fonctionnalités crypto et des cartes virtuelles",
      price: 7.99,
      hasPromo: true,
      website_url: "https://www.revolut.com"
    },
    {
      name: "ClickUp",
      category: "Gestion de projets",
      description: "Plateforme tout-en-un pour gérer projets, tâches et collaboration d'équipe",
      price: 5.99,
      hasPromo: true,
      website_url: "https://www.clickup.com"
    },
    {
      name: "Binance",
      category: "Crypto et finance",
      description: "Plateforme d'échange de cryptomonnaies leader avec des outils avancés",
      price: 0,
      hasPromo: true,
      website_url: "https://www.binance.com"
    },
    {
      name: "Canva",
      category: "Outils de création graphique",
      description: "Plateforme de design graphique intuitive pour créer des visuels professionnels",
      price: 12.99,
      hasPromo: true,
      website_url: "https://www.canva.com"
    },
    {
      name: "Jasper AI",
      category: "Applications IA",
      description: "Assistant d'écriture IA pour créer du contenu de qualité rapidement",
      price: 24.99,
      hasPromo: true,
      website_url: "https://www.jasper.ai"
    }
  ];

  // Find the featured app for this category
  const featuredApp = featuredApps.find(app => app.category === rec.category) || featuredApps[0];

  return (
    <StyledCategoryCard
      app={featuredApp}
      onExplore={() => window.open(featuredApp.website_url, '_blank')}
    />
  );
};