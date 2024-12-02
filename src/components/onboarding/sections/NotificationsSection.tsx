import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

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
    <div className="space-y-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">Notifications et rappels</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Checkbox
              id={`notification-${option.id}`}
              checked={value.includes(option.id)}
              onCheckedChange={() => handleToggle(option.id)}
              disabled={
                option.id !== "none" && value.includes("none") ||
                option.id === "none" && value.length > 0 && !value.includes("none")
              }
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label 
              htmlFor={`notification-${option.id}`}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {option.label}
            </Label>
          </motion.div>
        ))}
      </div>

      {value.length > 0 && value[0] !== "none" && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Notifications activées :</p>
          <div className="flex flex-wrap gap-2">
            {value.map((notification) => (
              <motion.span
                key={notification}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {options.find(o => o.id === notification)?.label}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};