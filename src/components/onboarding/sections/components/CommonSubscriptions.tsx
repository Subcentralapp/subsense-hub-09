import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface CommonSubscriptionsProps {
  value: string[];
  onToggle: (subscription: string) => void;
}

export const CommonSubscriptions = ({ value, onToggle }: CommonSubscriptionsProps) => {
  const commonSubscriptions = [
    { id: "netflix", label: "Netflix" },
    { id: "spotify", label: "Spotify" },
    { id: "disney", label: "Disney+" },
    { id: "amazon", label: "Amazon Prime" },
    { id: "canva", label: "Canva" },
    { id: "microsoft", label: "Microsoft 365" },
    { id: "apple", label: "Apple Music" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {commonSubscriptions.map((subscription) => (
        <motion.div 
          key={subscription.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Checkbox
            id={subscription.id}
            checked={value.includes(subscription.id)}
            onCheckedChange={() => onToggle(subscription.id)}
            disabled={value.length >= 5 && !value.includes(subscription.id)}
            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label 
            htmlFor={subscription.id}
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            {subscription.label}
          </Label>
        </motion.div>
      ))}
    </div>
  );
};