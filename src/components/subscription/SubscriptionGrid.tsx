import { Application } from "@/types/application";
import { SubscriptionCard } from "./SubscriptionCard";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  description?: string;
}

interface SubscriptionGridProps {
  subscriptions: Subscription[];
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: number) => void;
  applications?: Application[];
}

export const SubscriptionGrid = ({ 
  subscriptions, 
  onEdit, 
  onDelete, 
  applications 
}: SubscriptionGridProps) => {
  const findAlternatives = (subscription: Subscription, allApps: Application[]) => {
    if (!subscription?.name || !allApps?.length) return null;
    
    const currentApp = allApps.find(app => 
      app?.name?.toLowerCase() === subscription.name.toLowerCase()
    );
    
    if (!currentApp?.category) return null;

    const alternatives = allApps.filter(app => 
      app?.category === currentApp.category && 
      (app?.price || 0) < subscription.price &&
      app?.name?.toLowerCase() !== subscription.name.toLowerCase()
    );

    if (alternatives.length === 0) return null;

    const bestAlternative = alternatives.sort((a, b) => (a.price || 0) - (b.price || 0))[0];
    const savingsAmount = subscription.price - (bestAlternative.price || 0);

    return {
      currentApp,
      alternativeApp: bestAlternative,
      savingsAmount: Number(savingsAmount.toFixed(2))
    };
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
          onEdit={onEdit}
          onDelete={onDelete}
          alternative={applications ? findAlternatives(subscription, applications) : null}
        />
      ))}
    </div>
  );
};