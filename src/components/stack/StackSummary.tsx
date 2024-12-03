import { Application } from "@/types/application";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, X, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

interface StackSummaryProps {
  selectedApps: Application[];
  onRemoveApp: (app: Application) => void;
}

export const StackSummary = ({ selectedApps, onRemoveApp }: StackSummaryProps) => {
  const { toast } = useToast();
  
  const totalCost = selectedApps.reduce((sum, app) => sum + (app.price || 0), 0);

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text("Ma Stack Technique", 20, 20);
    
    // Add apps list
    doc.setFontSize(12);
    selectedApps.forEach((app, index) => {
      const yPosition = 40 + (index * 10);
      doc.text(`${app.name} - ${app.price}€/mois`, 20, yPosition);
    });
    
    // Add total
    doc.setFontSize(14);
    doc.text(`Total mensuel estimé : ${totalCost.toFixed(2)}€`, 20, 40 + (selectedApps.length * 10) + 10);
    
    // Save the PDF
    doc.save("ma-stack-technique.pdf");
    
    toast({
      title: "Export réussi !",
      description: "Votre stack technique a été exportée en PDF.",
    });
  };

  if (selectedApps.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8"
    >
      <Card className="p-6 bg-white/50 backdrop-blur-sm border border-primary/20">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Votre Stack Technique
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={exportToPDF}
              className="hover:bg-primary/5"
            >
              <Download className="h-4 w-4 mr-2" />
              Exporter ma stack
            </Button>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {selectedApps.map((app) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100"
                >
                  <div className="flex items-center gap-3">
                    {app.logo_url ? (
                      <img
                        src={app.logo_url}
                        alt={`Logo ${app.name}`}
                        className="w-8 h-8 rounded object-contain"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {app.name[0]}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-medium text-gray-900">{app.name}</h4>
                      <p className="text-sm text-gray-500">{app.price}€/mois</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveApp(app)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Total mensuel estimé</span>
              <span className="text-lg font-semibold text-primary">
                {totalCost.toFixed(2)}€
              </span>
            </div>
          </div>

          {selectedApps.length > 0 && (
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">
                    Suggestion pour votre stack
                  </h4>
                  <p className="text-sm text-amber-700">
                    Pour compléter votre stack, découvrez des outils complémentaires comme{" "}
                    {selectedApps[0]?.category === "Automatisation"
                      ? "Pipedrive pour automatiser vos ventes"
                      : "Make pour automatiser vos tâches"}.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};