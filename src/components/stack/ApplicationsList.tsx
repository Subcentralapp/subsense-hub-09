import { motion } from "framer-motion";
import { Application } from "@/types/application";
import { ApplicationCard } from "./ApplicationCard";

interface ApplicationsListProps {
  applications: Application[];
  onAddTool?: (app: Application) => void;
}

export const ApplicationsList = ({ applications, onAddTool }: ApplicationsListProps) => {
  if (!applications?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-2 space-y-2"
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