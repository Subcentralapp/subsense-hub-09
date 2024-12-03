import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Zap } from "lucide-react";
import { Application } from '@/types/application';
import { StackSearch } from './StackSearch';
import { toast } from '@/hooks/use-toast';

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
        <div className="space-y-3">
          {tools.map((tool) => (
            <Card 
              key={tool.id}
              className="p-3 bg-white hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{tool.name}</h4>
                  <p className="text-sm text-primary">{tool.price}€/mois</p>
                </div>
                {tool.features && tool.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tool.features.slice(0, 2).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/5 text-primary text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}

          <Card className="p-4 bg-primary/5 border-0">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Coût mensuel total</span>
              <span className="text-xl font-bold text-primary">
                {totalBudget.toFixed(2)}€/mois
              </span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};