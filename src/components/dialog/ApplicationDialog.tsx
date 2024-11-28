import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import ApplicationSearch from "./ApplicationSearch";
import ApplicationGrid from "./ApplicationGrid";
import { Application } from "@/types/application";

interface ApplicationDialogProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  onAddSubscription: (app: Application) => Promise<void>;
}

const ApplicationDialog = ({ applications, isLoading, onAddSubscription }: ApplicationDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || app.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [applications, searchTerm, selectedCategory]);

  const handleSearch = (newSearchTerm: string, category: string | null) => {
    setSearchTerm(newSearchTerm);
    setSelectedCategory(category);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un abonnement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choisir une application</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <ApplicationSearch 
            applications={applications} 
            onSearch={handleSearch}
          />
          <ApplicationGrid 
            applications={filteredApplications} 
            isLoading={isLoading} 
            onAddSubscription={onAddSubscription} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;