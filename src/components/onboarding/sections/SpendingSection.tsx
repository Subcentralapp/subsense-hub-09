import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  value: string;
  onChange: (value: string) => void;
  title: string;
}

export const SpendingSection = ({ value, onChange, title }: Props) => {
  const options = [
    { value: "0-20", label: "Moins de 20€" },
    { value: "20-50", label: "20€ à 50€" },
    { value: "50-100", label: "50€ à 100€" },
    { value: "100+", label: "Plus de 100€" },
  ];

  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <RadioGroup value={value} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              id={option.value}
              className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
            />
            <Label 
              htmlFor={option.value}
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