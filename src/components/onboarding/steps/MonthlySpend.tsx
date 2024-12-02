import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const MonthlySpend = ({ value, onChange }: Props) => {
  const options = [
    { value: "0-20", label: "Moins de 20€" },
    { value: "20-50", label: "20€ à 50€" },
    { value: "50-100", label: "50€ à 100€" },
    { value: "100+", label: "Plus de 100€" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">
          Combien estimez-vous dépenser chaque mois pour vos abonnements ?
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