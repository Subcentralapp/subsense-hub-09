import { stackCategories } from "@/data/stackSuggestions";
import { CategoryCard } from "./CategoryCard";

interface CategoryListProps {
  selectedCategory: string | null;
  onCategorySelect: (categoryName: string) => void;
}

export const CategoryList = ({ selectedCategory, onCategorySelect }: CategoryListProps) => {
  const handleCategoryClick = (categoryName: string) => {
    if (selectedCategory === categoryName) {
      onCategorySelect(""); // Désélectionne si déjà sélectionné
    } else {
      onCategorySelect(categoryName);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stackCategories.map((category) => (
        <CategoryCard
          key={category.name}
          name={category.name}
          description={category.description}
          color={category.color}
          isSelected={selectedCategory === category.name}
          onSelect={() => handleCategoryClick(category.name)}
        />
      ))}
    </div>
  );
};