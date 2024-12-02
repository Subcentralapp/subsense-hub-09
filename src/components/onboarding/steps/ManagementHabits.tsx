import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const ManagementHabits = ({ value, onChange }: Props) => {
  const options = [
    { value: "manual", label: "Je les gère manuellement (tableur, notes, etc.)" },
    { value: "memory", label: "Je fais confiance à ma mémoire" },
    { value: "app", label: "J'utilise une autre application spécialisée" },
    { value: "none", label: "Je ne les gère pas vraiment" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">
          Comment gérez-vous actuellement vos abonnements ?
        </h3>
      </div>

      <RadioGroup value={value} onValueChange={onChange}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};