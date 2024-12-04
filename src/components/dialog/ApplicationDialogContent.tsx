import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Application } from "@/types/application";
import ApplicationSearch from "./ApplicationSearch";
import ApplicationGrid from "./ApplicationGrid";
import CustomApplicationForm from "./CustomApplicationForm";
import { useState } from "react";

interface ApplicationDialogContentProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  onAddSubscription: (app: Application) => Promise<void>;
  searchTerm: string;
  onSearch: (term: string) => void;
}

const ApplicationDialogContent = ({
  applications,
  isLoading,
  onAddSubscription,
  searchTerm,
  onSearch,
}: ApplicationDialogContentProps) => {
  const [showCustomForm, setShowCustomForm] = useState(false);

  return (
    <>
      <DialogHeader className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <DialogTitle className="text-xl sm:text-2xl font-bold">
          Choisir une application
        </DialogTitle>
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
          onSearch={onSearch}
        />

        {showCustomForm ? (
          <CustomApplicationForm
            onSubmit={onAddSubscription}
            onCancel={() => setShowCustomForm(false)}
          />
        ) : (
          <ApplicationGrid
            applications={applications}
            isLoading={isLoading}
            onAddSubscription={onAddSubscription}
          />
        )}
      </div>
    </>
  );
};

export default ApplicationDialogContent;