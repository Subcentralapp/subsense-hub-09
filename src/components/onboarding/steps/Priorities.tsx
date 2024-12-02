import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const Priorities = ({ value, onChange }: Props) => {
  const options = [
    { id: "price", label: "Prix abordable" },
    { id: "features", label: "Large éventail de fonctionnalités" },
    { id: "cancellation", label: "Facilité de résiliation" },
    { id: "quality", label: "Qualité de service ou produit" },
    { id: "recommendations", label: "Recommandé par mes proches" },
    { id: "compatibility", label: "Compatibilité avec mes autres outils" },
  ];

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else if (value.length < 3) {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">
          Quelles sont vos priorités lorsque vous choisissez un abonnement ?
        </h3>
        <p className="text-sm text-muted-foreground">
          Choisissez jusqu'à 3 options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              checked={value.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
              disabled={value.length >= 3 && !value.includes(option.id)}
            />
            <Label htmlFor={option.id}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};