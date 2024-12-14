import { Application } from "@/types/application";
import { ApplicationCard } from "../ApplicationCard";
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
      className="mt-4 space-y-4 md:hidden" // Only show on mobile
    >
      {applications.map((app) => (
        <ApplicationCard
          key={app.id}
          app={app}
          onAdd={() => {
            console.log('Add application:', app.name);
            if (onAddTool) {
              onAddTool(app);
            }
          }}
        />
      ))}
    </motion.div>
  );
};