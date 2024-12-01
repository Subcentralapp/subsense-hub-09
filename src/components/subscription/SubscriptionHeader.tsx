import { CreditCard } from "lucide-react";

export const SubscriptionHeader = () => {
  return (
    <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
      <CreditCard className="h-6 w-6 text-primary" />
      Mes Abonnements Actifs
    </h2>
  );
};