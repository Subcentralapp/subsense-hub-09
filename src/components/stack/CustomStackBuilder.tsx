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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-semibold">Stack Technique Personnalisée</h2>
        </div>
        {tools.length > 0 && (
          <Button
            variant="outline"
            onClick={exportToPDF}
            className="hover:bg-primary/5"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter ma stack
          </Button>
        )}
      </div>

      <Card className="p-6 bg-[#F1F0FB] border-0 shadow-sm">
        <StackSearch onAddTool={handleAddTool} />
      </Card>

      {tools.map((tool, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="p-6 bg-white hover:shadow-md transition-all duration-200">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-gray-900">{tool.name}</h4>
                <p className="text-sm text-gray-500">{tool.price}€/mois</p>
              </div>
              {tool.features && tool.features.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tool.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#E5DEFF] text-primary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}

      {tools.length > 0 && (
        <div className="space-y-6">
          <Card className="p-6 bg-[#FDE1D3] border-0">
            <StackSummary tools={tools} />
          </Card>
          <Card className="p-6 bg-[#D3E4FD] border-0">
            <StackFeatures tools={tools} />
          </Card>
        </div>
      )}
    </div>
  );
};