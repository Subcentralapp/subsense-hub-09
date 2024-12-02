import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Vos habitudes de gestion</h3>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="space-y-3">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`management-${option.value}`} />
              <Label htmlFor={`management-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};