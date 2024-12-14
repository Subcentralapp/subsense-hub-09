import { Application } from "@/types/application";
import { motion } from "framer-motion";

interface CategoryContentProps {
  isExpanded: boolean;
  applications: Application[];
  onAddTool?: (app: Application) => void;
}

export const CategoryContent = ({ isExpanded, applications, onAddTool }: CategoryContentProps) => {
  if (!isExpanded || applications.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {applications.map((app) => (
        <div key={app.id} className="p-4 bg-white rounded-lg shadow">
          <h4 className="font-medium text-gray-900">{app.name}</h4>
          <p className="text-sm text-gray-500">
            {app.price ? `${app.price}€/mois` : 'Gratuit'}
          </p>
          <button
            onClick={() => {
              console.log('Add application:', app.name);
              if (onAddTool) {
                onAddTool(app);
              }
            }}
            className="mt-2 text-primary hover:text-primary/80"
          >
            Ajouter l'abonnement
          </button>
        </div>
      ))}
    </motion.div>
  );
};