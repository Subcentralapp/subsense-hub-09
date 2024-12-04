import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import ApplicationSearch from "./ApplicationSearch";
import ApplicationGrid from "./ApplicationGrid";
import { Application } from "@/types/application";
import CustomApplicationForm from "./CustomApplicationForm";

interface ApplicationDialogProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  onAddSubscription: (app: Application) => Promise<void>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ApplicationDialog = ({ 
  applications, 
  isLoading, 
  onAddSubscription,
  isOpen,
  onOpenChange
}: ApplicationDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showCustomForm, setShowCustomForm] = useState(false);

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    
    return applications.filter(app => {
      const appName = app.name?.toLowerCase() || '';
      const appDescription = app.description?.toLowerCase() || '';
      const searchTermLower = searchTerm.toLowerCase();
      
      return appName.includes(searchTermLower) || appDescription.includes(searchTermLower);
    });
  }, [applications, searchTerm]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base rounded-lg sm:rounded-md">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un abonnement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold">Choisir une application</DialogTitle>
          <button
            onClick={() => setShowCustomForm(!showCustomForm)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-neutral-light rounded-lg hover:bg-neutral-light/80"
          >
            <Plus className="h-4 w-4" />
            Je ne trouve pas mon abonnement
          </button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <ApplicationSearch 
            applications={applications} 
            onSearch={setSearchTerm}
          />

          {showCustomForm ? (
            <CustomApplicationForm
              onSubmit={onAddSubscription}
              onCancel={() => setShowCustomForm(false)}
            />
          ) : (
            <ApplicationGrid 
              applications={filteredApplications} 
              isLoading={isLoading} 
              onAddSubscription={onAddSubscription}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;