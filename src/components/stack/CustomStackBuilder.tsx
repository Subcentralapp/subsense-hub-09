import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import { Application } from '@/types/application';
import { StackSearch } from './StackSearch';
import { StackFeatures } from './StackFeatures';
import { StackSummary } from './StackSummary';

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

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text("Ma Stack Technique Personnalisée", 20, 20);
    
    doc.setFontSize(14);
    const totalBudget = tools.reduce((sum, tool) => sum + tool.price, 0);
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

        <StackSearch onAddTool={handleAddTool} />

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

        {tools.length > 0 && (
          <div>
            <StackSummary tools={tools} />
            <StackFeatures tools={tools} />
          </div>
        )}
      </div>
    </Card>
  );
};