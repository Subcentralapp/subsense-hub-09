import { useState } from 'react';
import { Layers } from "lucide-react";
import { motion } from "framer-motion";
import { CategoryList } from "./stack/CategoryList";
import { StackSummary } from "./stack/StackSummary";
import { CustomStackBuilder } from "./stack/CustomStackBuilder";
import { stackCategories } from "@/data/stackSuggestions";
import { Application } from "@/types/application";

export const TechnicalStackSuggestion = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName === "" ? null : categoryName);
  };

  const handleAppToggle = (app: Application) => {
    setSelectedApps(prev => {
      const isAlreadySelected = prev.some(a => a.name === app.name);
      if (isAlreadySelected) {
        return prev.filter(a => a.name !== app.name);
      }
      return [...prev, app];
    });
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Créez votre Stack Technique</h2>
      </div>

      <CategoryList 
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          <StackSummary
            selectedApps={selectedApps}
            onRemoveApp={(app) => handleAppToggle(app)}
          />
        </motion.div>
      )}

      <CustomStackBuilder />
    </div>
  );
};