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

  // Créer un Map pour stocker les applications uniques
  const uniqueApps = new Map();
  applications?.forEach(app => {
    const key = `${app.name.toLowerCase()}-${app.category}`;
    if (!uniqueApps.has(key)) {
      uniqueApps.set(key, app);
    }
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-2">
      {Array.from(uniqueApps.values()).map((app) => (
        <ApplicationCard 
          key={`${app.name}-${app.category}`}
          app={app}
          onAdd={onAddSubscription}
        />
      ))}
    </div>
  );
};

export default ApplicationGrid;