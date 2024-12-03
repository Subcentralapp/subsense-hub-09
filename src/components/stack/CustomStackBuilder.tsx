import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Zap, X, ArrowRight } from "lucide-react";
import { Application } from '@/types/application';
import { StackSearch } from './StackSearch';
import { toast } from '@/hooks/use-toast';
import { motion } from "framer-motion";

export const CustomStackBuilder = () => {
  const [tools, setTools] = useState<Application[]>([]);

  const handleAddTool = (app: Application) => {
    if (tools.some(tool => tool.id === app.id)) {
      toast({
        title: "Application déjà ajoutée",
        description: `${app.name} est déjà dans votre stack`,
        variant: "destructive"
      });
      return;
    }
    
    setTools(prev => [...prev, app]);
  };

  const handleRemoveTool = (appId: number) => {
    setTools(prev => prev.filter(tool => tool.id !== appId));
  };

  const totalBudget = tools.reduce((sum, tool) => sum + tool.price, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Stack Technique Personnalisée</h3>
      </div>

      <Card className="p-4 bg-white border border-gray-100">
        <StackSearch onAddTool={handleAddTool} />
      </Card>

      {tools.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center flex-wrap gap-2">
            {tools.map((tool, index) => (
              <motion.div 
                key={tool.id}
                className="flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="flex items-center gap-2 p-2 pr-3 bg-white hover:shadow-sm transition-shadow">
                  {tool.logo_url ? (
                    <img 
                      src={tool.logo_url} 
                      alt={tool.name}
                      className="w-6 h-6 rounded object-contain"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {tool.name[0]}
                      </span>
                    </div>
                  )}
                  <span className="text-sm font-medium">{tool.name}</span>
                  <span className="text-sm text-primary">{tool.price}€</span>
                  <button
                    onClick={() => handleRemoveTool(tool.id)}
                    className="ml-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Card>
                {index < tools.length - 1 && (
                  <motion.div 
                    className="mx-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <ArrowRight className="h-4 w-4 text-primary/60" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <Card className="p-3 bg-primary/5 border-0">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Coût mensuel total</h4>
            <span className="text-xl font-bold text-primary">
              {totalBudget.toFixed(2)}€/mois
            </span>
          </Card>
        </div>
      )}
    </div>
  );
};