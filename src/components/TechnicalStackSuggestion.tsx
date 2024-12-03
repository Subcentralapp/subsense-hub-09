import { useState } from 'react';
import { Layers } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryList } from "./stack/CategoryList";
import { stackCategories } from "@/data/stackSuggestions";
import { Application } from "@/types/application";
import { ApplicationCard } from "./ApplicationCard";
import { CustomStackBuilder } from "./stack/CustomStackBuilder";
import { TrendingTools2025 } from "./TrendingTools2025";
import { StackHeroBanner } from "./stack/StackHeroBanner";

export const TechnicalStackSuggestion = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryName ? null : categoryName
    );
  };

  // Trouver les applications recommandées pour la catégorie sélectionnée
  const recommendedApps = selectedCategory
    ? stackCategories
        .find(cat => cat.name === selectedCategory)
        ?.recommendations.map(rec => ({
          id: Date.now(), // Temporary ID for demo
          name: rec.name,
          price: parseFloat(rec.price?.replace(/[^0-9.,]/g, '') || '0'),
          category: selectedCategory,
          description: rec.description,
          features: [],
          pros: null,
          cons: null,
          website_url: null,
          logo_url: null,
          rating: null,
          review: null,
          users_count: null
        }))
    : [];

  return (
    <div className="space-y-8">
      <StackHeroBanner />
      
      <div className="flex items-center gap-2 mb-6">
        <Layers className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Créez votre Stack Technique</h2>
      </div>

      <CategoryList 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-8 space-y-6"
        >
          <h3 className="text-xl font-medium text-gray-800">
            Applications recommandées pour {selectedCategory}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedApps?.map((app, index) => (
              <ApplicationCard
                key={`${app.name}-${index}`}
                app={app}
                onAdd={() => {}}
              />
            ))}
          </div>
        </motion.div>
      )}

      <CustomStackBuilder />
      
      <div className="mt-12">
        <TrendingTools2025 />
      </div>
    </div>
  );
};