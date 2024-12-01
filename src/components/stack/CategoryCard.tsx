import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CategoryCardProps {
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const CategoryCard = ({ name, description, color, isSelected, onSelect }: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`p-4 cursor-pointer ${color} border-2 transition-all ${
          isSelected 
            ? 'border-primary shadow-lg' 
            : 'border-transparent hover:border-primary/20'
        }`}
        onClick={onSelect}
      >
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
};