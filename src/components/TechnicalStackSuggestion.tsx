import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Download, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { stackCategories } from "@/data/stackSuggestions";
import { CategoryCard } from "./stack/CategoryCard";
import { toast } from './ui/use-toast';
import jsPDF from 'jspdf';

export const TechnicalStackSuggestion = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  const handleAppToggle = (appName: string) => {
    setSelectedApps(prev => {
      const isAlreadySelected = prev.includes(appName);
      if (isAlreadySelected) {
        return prev.filter(a => a !== appName);
      }
      return [...prev, appName];
    });
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Ma Stack Technique", 20, 20);
    
    // Group apps by category
    const groupedApps = stackCategories.reduce((acc, category) => {
      const categoryApps = selectedApps.filter(app => 
        category.currentStack.includes(app) || 
        category.recommendations.some(rec => rec.name === app)
      );
      if (categoryApps.length > 0) {
        acc[category.name] = categoryApps;
      }
      return acc;
    }, {} as Record<string, string[]>);
    
    // Add apps by category
    let yPosition = 40;
    Object.entries(groupedApps).forEach(([category, apps]) => {
      doc.setFontSize(14);
      doc.text(category, 20, yPosition);
      yPosition += 10;
      
      doc.setFontSize(12);
      apps.forEach(app => {
        doc.text(`- ${app}`, 30, yPosition);
        yPosition += 10;
      });
      yPosition += 5;
    });
    
    // Save the PDF
    doc.save("ma-stack-technique.pdf");
    
    toast({
      title: "Export réussi !",
      description: "Votre stack technique a été exportée en PDF.",
    });
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Créez votre Stack Technique</h2>
        </div>
        {selectedApps.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={exportToPDF}
            className="hover:bg-primary/5"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter ma stack
          </Button>
        )}
      </div>

      {/* Sélection de catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stackCategories.map((category) => (
          <CategoryCard
            key={category.name}
            name={category.name}
            description={category.description}
            color={category.color}
            isSelected={selectedCategory === category.name}
            onSelect={() => handleCategorySelect(category.name)}
          />
        ))}
      </div>

      {/* Stack actuelle et recommandations */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 space-y-6"
        >
          {/* Stack actuelle */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border border-primary/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Stack {selectedCategory} recommandée
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stackCategories
                .find(cat => cat.name === selectedCategory)
                ?.currentStack.map((app) => (
                  <motion.div
                    key={app}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`p-4 cursor-pointer transition-all ${
                        selectedApps.includes(app)
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/20'
                      }`}
                      onClick={() => handleAppToggle(app)}
                    >
                      <div className="font-medium">{app}</div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </Card>

          {/* Recommandations */}
          <Card className="p-6 bg-white/50 backdrop-blur-sm border border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <h3 className="text-lg font-semibold text-gray-900">
                Recommandations complémentaires
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stackCategories
                .find(cat => cat.name === selectedCategory)
                ?.recommendations.map((app) => (
                  <motion.div
                    key={app.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className={`p-4 cursor-pointer transition-all ${
                        selectedApps.includes(app.name)
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/20'
                      }`}
                      onClick={() => handleAppToggle(app.name)}
                    >
                      <div className="space-y-2">
                        <div className="font-medium">{app.name}</div>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {app.description}
                        </p>
                        {app.price && (
                          <div className="text-sm font-medium text-primary">
                            {app.price}
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Résumé de la stack */}
      {selectedApps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg"
        >
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  Votre stack ({selectedApps.length}):
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedApps.map(app => (
                    <span
                      key={app}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={exportToPDF}
                className="hover:bg-primary/5"
              >
                <Download className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};