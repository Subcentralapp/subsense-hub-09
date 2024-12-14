import { useState } from "react";
import { Application } from "@/types/application";
import { CategoryHeader } from "@/components/stack/CategoryHeader";
import { CategoryContent } from "./CategoryContent";
import { stackCategories } from "@/data/stackSuggestions";
import { ApplicationCard } from "../ApplicationCard";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
  onAddTool?: (app: Application) => void;
}

export const CategoryCard = ({ 
  name, 
  description, 
  color, 
  isSelected, 
  onSelect,
  onAddTool 
}: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (newExpandedState !== isSelected) {
      onSelect();
    }
  };

  const applications = stackCategories
    .find(cat => cat.name === name)
    ?.recommendations.map(rec => ({
      id: Date.now() + Math.random(),
      name: rec.name,
      price: parseFloat(rec.price?.replace(/[^0-9.,]/g, '') || '0'),
      category: name,
      description: rec.description,
      features: [],
      pros: null,
      cons: null,
      website_url: rec.website_url || '',
      logo_url: null,
      rating: null,
      review: null,
      users_count: null
    })) || [];

  console.log(`Applications for category ${name}:`, applications);
  
  return (
    <div className="w-full">
      <CategoryHeader
        name={name}
        description={description}
        color={color}
        isSelected={isSelected}
        onClick={handleClick}
      />
      
      {/* Version mobile - Liste uniquement */}
      <CategoryContent 
        isExpanded={isExpanded}
        applications={applications}
        onAddTool={onAddTool}
      />

      {/* Version desktop - Bloc horizontal uniquement */}
      {isExpanded && applications.length > 0 && (
        <div className="hidden md:block mt-4">
          <h3 className="text-xl font-medium text-gray-800 mb-4">
            Applications recommandées pour {name}
          </h3>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-3 gap-4"
          >
            {applications.map((app) => (
              <ApplicationCard
                key={app.id}
                app={app}
                onAdd={() => {
                  console.log('Add application:', app.name);
                  if (onAddTool) {
                    onAddTool(app);
                  }
                }}
              />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};