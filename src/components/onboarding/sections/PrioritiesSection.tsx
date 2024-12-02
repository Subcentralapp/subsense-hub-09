import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const PrioritiesSection = ({ value, onChange }: Props) => {
  const priorities = [
    { id: "price", label: "Prix abordable" },
    { id: "features", label: "Large éventail de fonctionnalités" },
    { id: "cancellation", label: "Facilité de résiliation" },
    { id: "quality", label: "Qualité de service ou produit" },
    { id: "recommendations", label: "Recommandé par mes proches" },
    { id: "compatibility", label: "Compatibilité avec mes autres outils" },
  ];

  const handleToggle = (priorityId: string) => {
    if (value.includes(priorityId)) {
      onChange(value.filter(p => p !== priorityId));
    } else if (value.length < 3) {
      onChange([...value, priorityId]);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">Vos priorités en matière d'abonnements</h3>
        <p className="text-sm text-gray-500 mt-1">
          Choisissez jusqu'à 3 options qui vous semblent les plus importantes
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorities.map((priority, index) => (
          <motion.div
            key={priority.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Checkbox
              id={priority.id}
              checked={value.includes(priority.id)}
              onCheckedChange={() => handleToggle(priority.id)}
              disabled={value.length >= 3 && !value.includes(priority.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label 
              htmlFor={priority.id}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {priority.label}
            </Label>
          </motion.div>
        ))}
      </div>

      {value.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Sélectionnés ({value.length}/3) :</p>
          <div className="flex flex-wrap gap-2">
            {value.map((priority) => (
              <motion.span
                key={priority}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {priorities.find(p => p.id === priority)?.label}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};