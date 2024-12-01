import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CategoryRecommendation } from "@/types/recommendation";

interface CategoryCardProps {
  rec: CategoryRecommendation;
  onExplore: (category: string) => void;
}

export const CategoryCard = ({ rec, onExplore }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`${rec.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">
            {rec.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">{rec.rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div>
          <h4 className="text-xl font-semibold text-gray-900">{rec.name}</h4>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {rec.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progression</span>
            <span className="font-medium">{Math.round(rec.progress)}%</span>
          </div>
          <div className="h-2 bg-white/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary/60 rounded-full transition-all duration-500"
              style={{ width: `${rec.progress}%` }}
            />
          </div>
        </div>

        <Button
          variant="secondary"
          className="w-full mt-2 bg-white/80 hover:bg-white"
          onClick={() => onExplore(rec.category)}
        >
          Explorer la catégorie
        </Button>
      </div>
    </motion.div>
  );
};