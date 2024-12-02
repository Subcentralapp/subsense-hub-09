import { motion } from "framer-motion";

interface SelectedSubscriptionsProps {
  value: string[];
}

export const SelectedSubscriptions = ({ value }: SelectedSubscriptionsProps) => {
  if (value.length === 0) return null;

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-2">Sélectionnés ({value.length}/5) :</p>
      <div className="flex flex-wrap gap-2">
        {value.map((subscription) => (
          <motion.span
            key={subscription}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary"
          >
            {subscription}
          </motion.span>
        ))}
      </div>
    </div>
  );
};