import { useState } from "react";
import { Application } from "@/types/application";
import { CategoryHeader } from "./CategoryHeader";
import { ApplicationsList } from "./ApplicationsList";
import { stackCategories } from "@/data/stackSuggestions";

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
    setIsExpanded(!isExpanded);
    onSelect();
  };

  // Get applications from stackCategories instead of database
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
      
      {(isExpanded || isSelected) && (
        <ApplicationsList 
          applications={applications}
          onAddTool={onAddTool}
        />
      )}
    </div>
  );
};