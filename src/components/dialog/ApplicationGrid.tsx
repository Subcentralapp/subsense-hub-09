import { ApplicationCard } from "../ApplicationCard";
import { Application } from "@/types/application";

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

  if (!applications) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-2">
      {applications.map((app) => (
        <ApplicationCard 
          key={app.name}
          app={app}
          onAdd={onAddSubscription}
        />
      ))}
    </div>
  );
};

export default ApplicationGrid;