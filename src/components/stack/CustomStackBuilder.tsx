import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from '../../hooks/use-toast';
import jsPDF from 'jspdf';

interface Tool {
  name: string;
  price: number;
  features: string[];
}

export const CustomStackBuilder = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [showAddTool, setShowAddTool] = useState(false);
  const [newTool, setNewTool] = useState<Tool>({ name: '', price: 0, features: [] });

  const totalBudget = tools.reduce((sum, tool) => sum + tool.price, 0);
  const allFeatures = tools.flatMap(tool => tool.features);

  const handleAddTool = () => {
    if (newTool.name && newTool.price >= 0) {
      setTools([...tools, newTool]);
      setNewTool({ name: '', price: 0, features: [] });
      setShowAddTool(false);
      toast({
        title: "Outil ajouté",
        description: `${newTool.name} a été ajouté à votre stack.`,
      });
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Ma Stack Technique Personnalisée", 20, 20);
    
    doc.setFontSize(14);
    doc.text(`Budget Total: ${totalBudget.toFixed(2)}€/mois`, 20, 40);
    
    let y = 60;
    
    tools.forEach(tool => {
      doc.text(`${tool.name} - ${tool.price}€/mois`, 30, y);
      y += 10;
    });
    
    doc.save("ma-stack-technique.pdf");
    
    toast({
      title: "Export réussi !",
      description: "Votre stack technique a été exportée en PDF.",
    });
  };

  return (
    <Card className="p-6 mt-8 bg-white shadow-lg border border-gray-100">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold text-gray-900">
              Stack Technique Personnalisée
            </h3>
          </div>
          {tools.length > 0 && (
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

        <div className="space-y-4">
          {showAddTool ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de l'outil
                </label>
                <input
                  type="text"
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Ex: Figma"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prix mensuel (€)
                </label>
                <input
                  type="number"
                  value={newTool.price}
                  onChange={(e) => setNewTool({ ...newTool, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fonctionnalités (séparées par des virgules)
                </label>
                <input
                  type="text"
                  onChange={(e) => setNewTool({ ...newTool, features: e.target.value.split(',').map(f => f.trim()) })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  placeholder="Ex: Design, Prototypage, Collaboration"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddTool(false)}
                >
                  Annuler
                </Button>
                <Button onClick={handleAddTool}>
                  Ajouter
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              onClick={() => setShowAddTool(true)}
              className="w-full"
              variant="outline"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter un outil
            </Button>
          )}

          {tools.map((tool, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-white rounded-lg border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-900">{tool.name}</h4>
                  <p className="text-sm text-gray-500">{tool.price}€/mois</p>
                </div>
                {tool.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {tools.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Budget Total</span>
              <span className="text-xl font-bold text-primary">
                {totalBudget.toFixed(2)}€/mois
              </span>
            </div>
            {allFeatures.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Fonctionnalités disponibles
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(allFeatures)).map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};