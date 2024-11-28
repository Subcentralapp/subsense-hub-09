import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ApplicationSearch from "./ApplicationSearch";
import ApplicationGrid from "./ApplicationGrid";
import { Application } from "@/types/application";

interface ApplicationDialogProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  onAddSubscription: (app: Application) => Promise<void>;
}

const ApplicationDialog = ({ applications, isLoading, onAddSubscription }: ApplicationDialogProps) => {
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
          <ApplicationSearch applications={applications} />
          <ApplicationGrid applications={applications} isLoading={isLoading} onAddSubscription={onAddSubscription} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;