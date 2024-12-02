import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Vos priorités en matière d'abonnements</h3>
      <p className="text-sm text-muted-foreground">
        Choisissez jusqu'à 3 options
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {priorities.map((priority) => (
          <div key={priority.id} className="flex items-center space-x-2">
            <Checkbox
              id={priority.id}
              checked={value.includes(priority.id)}
              onCheckedChange={() => handleToggle(priority.id)}
              disabled={value.length >= 3 && !value.includes(priority.id)}
            />
            <Label htmlFor={priority.id}>{priority.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};