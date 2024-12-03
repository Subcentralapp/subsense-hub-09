import { stackCategories } from "@/data/stackSuggestions";
import { CategoryCard } from "./CategoryCard";

interface CategoryListProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryName: string) => void;
}

export const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stackCategories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          description={category.description}
          color={category.color}
          isSelected={selectedCategory === category.name}
          onSelect={() => onCategorySelect(category.name)}
        />
      ))}
    </div>
  );
};