import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Layers, Plus, Check, Shuffle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";

const categories = [
  {
    name: "Automatisation",
    description: "Automatisez vos tâches répétitives",
    suggestions: ["Make", "Airtable", "Zapier", "Notion", "Gmail"],
    color: "bg-purple-100"
  },
  {
    name: "Design",
    description: "Créez des designs professionnels",
    suggestions: ["Figma", "Canva", "Adobe Creative Cloud", "Sketch", "Photoshop"],
    color: "bg-pink-100"
  },
  {
    name: "Productivité",
    description: "Optimisez votre flux de travail",
    suggestions: ["Notion", "ClickUp", "Slack", "Trello", "Asana"],
    color: "bg-blue-100"
  },
  {
    name: "Marketing Digital",
    description: "Développez votre présence en ligne",
    suggestions: ["Semrush", "Mailchimp", "HubSpot", "Buffer", "Google Ads"],
    color: "bg-green-100"
  },
  {
    name: "Intelligence Artificielle",
    description: "Intégrez l'IA dans votre workflow",
    suggestions: ["ChatGPT", "Jasper", "Copy.ai", "Midjourney", "Claude"],
    color: "bg-indigo-100"
  }
];

export const TechnicalStackSuggestion = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedApps, setSelectedApps] = useState<string[]>([]);

  const { data: applications } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*');
      
      if (error) throw error;
      return data as Application[];
    }
  });

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedApps([]);
  };

  const handleAppToggle = (appName: string) => {
    setSelectedApps(prev => 
      prev.includes(appName) 
        ? prev.filter(name => name !== appName)
        : [...prev, appName]
    );
  };

  const getAppDetails = (appName: string) => {
    return applications?.find(app => app.NOM === appName);
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Layers className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Créez votre Stack Technique</h2>
      </div>

      {/* Sélection de catégorie */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer ${category.color} border-2 transition-all ${
                selectedCategory === category.name 
                  ? 'border-primary shadow-lg' 
                  : 'border-transparent hover:border-primary/20'
              }`}
              onClick={() => handleCategorySelect(category.name)}
            >
              <h3 className="font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Suggestions d'applications */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <Card className="p-6 bg-white/50 backdrop-blur-sm border border-primary/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Stack recommandée pour {selectedCategory}
              </h3>
              <div className="flex items-center gap-2">
                <Shuffle className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-600">
                  {selectedApps.length} sélectionnés
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories
                .find(cat => cat.name === selectedCategory)
                ?.suggestions.map((appName) => {
                  const app = getAppDetails(appName);
                  const isSelected = selectedApps.includes(appName);

                  return (
                    <motion.div
                      key={appName}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className={`p-4 cursor-pointer transition-all ${
                          isSelected 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-primary/20'
                        }`}
                        onClick={() => handleAppToggle(appName)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {app?.logo_url ? (
                              <img 
                                src={app.logo_url} 
                                alt={appName}
                                className="w-8 h-8 rounded object-contain"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">
                                  {appName[0]}
                                </span>
                              </div>
                            )}
                            <div>
                              <h4 className="font-medium text-gray-900">{appName}</h4>
                              <p className="text-sm text-gray-500">
                                {app?.PRICE ? `${app.PRICE}€/mois` : 'Prix non disponible'}
                              </p>
                            </div>
                          </div>
                          {isSelected ? (
                            <Check className="h-5 w-5 text-primary" />
                          ) : (
                            <Plus className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
            </div>

            {selectedApps.length > 0 && (
              <div className="mt-6">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => {
                    // TODO: Implement adding selected apps to user's subscriptions
                    console.log('Selected apps:', selectedApps);
                  }}
                >
                  Ajouter à mes abonnements
                  <Plus className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      )}
    </div>
  );
};