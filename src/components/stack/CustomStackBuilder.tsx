import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Zap, X, ArrowRight, Plus } from "lucide-react";
import { Application } from '@/types/application';
import { StackSearch } from './StackSearch';
import { toast } from '@/hooks/use-toast';
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import CustomApplicationForm from '../dialog/CustomApplicationForm';

interface CustomStackBuilderProps {
  selectedTools: Application[];
  onRemoveTool: (tool: Application) => void;
}

export const CustomStackBuilder = ({ selectedTools, onRemoveTool }: CustomStackBuilderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const totalBudget = selectedTools.reduce((sum, tool) => sum + (tool.price || 0), 0);

  const handleAddCustomApp = async (app: Application) => {
    // Simuler l'ajout d'une application personnalisée
    const customApp: Application = {
      ...app,
      id: Date.now(), // Générer un ID unique
    };
    
    selectedTools.push(customApp);
    setIsDialogOpen(false);
    toast({
      title: "Application ajoutée",
      description: `${app.name} a été ajoutée à votre stack personnalisée`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Stack Technique Personnalisée</h3>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto gap-2">
              <Plus className="h-4 w-4" />
              Je n'ai pas trouvé mon app
            </Button>
          </DialogTrigger>
          <DialogContent>
            <CustomApplicationForm
              onSubmit={handleAddCustomApp}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4 bg-white border border-gray-100">
        {selectedTools.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center flex-wrap gap-2">
              {selectedTools.map((tool, index) => (
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
                      onClick={() => onRemoveTool(tool)}
                      className="ml-1 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </Card>
                  {index < selectedTools.length - 1 && (
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
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Sélectionnez des applications dans les catégories ci-dessus pour créer votre stack personnalisée</p>
          </div>
        )}
      </Card>
    </div>
  );
};