import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{title}</h3>
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};