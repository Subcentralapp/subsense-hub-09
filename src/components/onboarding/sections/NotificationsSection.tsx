import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const NotificationsSection = ({ value, onChange }: Props) => {
  const options = [
    { id: "renewal", label: "Alertes avant les dates de renouvellement" },
    { id: "suggestions", label: "Suggestions d'abonnements moins chers" },
    { id: "reminders", label: "Rappels pour les factures non réglées" },
    { id: "none", label: "Je ne veux pas de notifications" },
  ];

  const handleToggle = (optionId: string) => {
    if (optionId === "none") {
      onChange(value.includes("none") ? [] : ["none"]);
    } else {
      if (value.includes("none")) {
        onChange([optionId]);
      } else {
        onChange(
          value.includes(optionId)
            ? value.filter(v => v !== optionId)
            : [...value, optionId]
        );
      }
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Notifications et rappels</h3>
      <div className="space-y-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={`notification-${option.id}`}
              checked={value.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
              disabled={
                option.id !== "none" && value.includes("none") ||
                option.id === "none" && value.length > 0 && !value.includes("none")
              }
            />
            <Label htmlFor={`notification-${option.id}`}>{option.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};