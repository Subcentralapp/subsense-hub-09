import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Application } from "@/types/application";
import ApplicationDialogContent from "./ApplicationDialogContent";

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
  onOpenChange,
}: ApplicationDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");

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
        <ApplicationDialogContent
          applications={filteredApplications}
          isLoading={isLoading}
          onAddSubscription={onAddSubscription}
          searchTerm={searchTerm}
          onSearch={setSearchTerm}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;