import { Card } from "@/components/ui/card";
import { Plus, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Application } from "@/types/application";

interface ApplicationCardProps {
  app: Application;
  onAdd: () => void;
}

export const ApplicationCard = ({ app, onAdd }: ApplicationCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="p-4 cursor-pointer transition-all hover:border-primary/20"
        onClick={onAdd}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {app.logo_url ? (
              <img 
                src={app.logo_url} 
                alt={app.name}
                className="w-8 h-8 rounded object-contain"
              />
            ) : (
              <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {app.name[0]}
                </span>
              </div>
            )}
            <div>
              <h4 className="font-medium text-gray-900">{app.name}</h4>
              <p className="text-sm text-gray-500">
                {app.price ? `${app.price}€/mois` : 'Prix non disponible'}
              </p>
            </div>
          </div>
          <Plus className="h-5 w-5 text-gray-400" />
        </div>
      </Card>
    </motion.div>
  );
};