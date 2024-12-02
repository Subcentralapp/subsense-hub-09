import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ManagementHabitsSection = ({ value, onChange }: Props) => {
  const options = [
    { value: "manual", label: "Je les gère manuellement (tableur, notes, etc.)" },
    { value: "memory", label: "Je fais confiance à ma mémoire" },
    { value: "app", label: "J'utilise une autre application spécialisée" },
    { value: "none", label: "Je ne les gère pas vraiment" },
  ];

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Vos habitudes de gestion</h3>
      <RadioGroup value={value} onValueChange={onChange} className="space-y-3">
        {options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RadioGroupItem 
              value={option.value} 
              id={`management-${option.value}`}
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <Label 
              htmlFor={`management-${option.value}`}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {option.label}
            </Label>
          </motion.div>
        ))}
      </RadioGroup>
    </div>
  );
};