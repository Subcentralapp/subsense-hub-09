import { useState } from "react";
import { Application } from "@/types/application";
import { CategoryHeader } from "./CategoryHeader";
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
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (newExpandedState !== isSelected) {
      onSelect();
    }
  };
  
  return (
    <div className="w-full">
      <CategoryHeader
        name={name}
        description={description}
        color={color}
        isSelected={isSelected}
        onClick={handleClick}
      />
    </div>
  );
};