import { ApplicationCard } from "../ApplicationCard";
import { Application } from "@/types/application";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApplicationGridProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  onAddSubscription: (app: Application) => Promise<void>;
}

const ApplicationGrid = ({ applications, isLoading, onAddSubscription }: ApplicationGridProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!applications?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] text-gray-500">
        <p>Aucune application trouvée</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[60vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
        {applications.map((app) => (
          <ApplicationCard 
            key={app.id}
            app={app}
            onAdd={onAddSubscription}
          />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ApplicationGrid;