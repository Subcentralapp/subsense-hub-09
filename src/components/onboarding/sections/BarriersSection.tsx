import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const BarriersSection = ({ value, onChange }: Props) => {
  const options = [
    { id: "price", label: "Trop cher" },
    { id: "commitment", label: "Engagement obligatoire (durée minimale)" },
    { id: "complexity", label: "Offre trop compliquée" },
    { id: "useless", label: "Aucune utilité" },
  ];

  const handleToggle = (optionId: string) => {
    if (value.includes(optionId)) {
      onChange(value.filter(v => v !== optionId));
    } else {
      onChange([...value, optionId]);
    }
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">
        Qu'est-ce qui vous empêche de souscrire à de nouveaux abonnements ?
      </h3>

      <div className="grid gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Checkbox
              id={option.id}
              checked={value.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label 
              htmlFor={option.id}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {option.label}
            </Label>
          </motion.div>
        ))}
      </div>
    </div>
  );
};