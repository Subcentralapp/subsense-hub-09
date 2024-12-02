import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const RecommendationsSection = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">
        Recevoir des recommandations personnalisées
      </h3>

      <RadioGroup
        value={value ? "yes" : "no"}
        onValueChange={(val) => onChange(val === "yes")}
        className="space-y-3"
      >
        {[
          { value: "yes", label: "Oui, je veux des recommandations adaptées à mon profil" },
          { value: "no", label: "Non, je préfère gérer mes abonnements seul(e)" }
        ].map((option, index) => (
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