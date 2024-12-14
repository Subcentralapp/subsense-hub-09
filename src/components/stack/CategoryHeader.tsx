import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CategoryHeaderProps {
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
  onClick: () => void;
}

export const CategoryHeader = ({ name, description, color, isSelected, onClick }: CategoryHeaderProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`p-4 cursor-pointer ${color} transition-all ${
          isSelected
            ? 'border-2 border-primary shadow-lg' 
            : 'border-2 border-transparent hover:border-primary/20'
        }`}
        onClick={onClick}
      >
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
};