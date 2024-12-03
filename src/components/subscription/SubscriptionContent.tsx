import { SubscriptionCard } from "./SubscriptionCard";
import { EmptySubscriptionState } from "./EmptySubscriptionState";
import { Subscription } from "@/types/subscription";

interface SubscriptionContentProps {
  subscriptions: Subscription[] | null;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: number) => void;
}

export const SubscriptionContent = ({ subscriptions, onEdit, onDelete }: SubscriptionContentProps) => {
  if (!subscriptions || subscriptions.length === 0) {
    return <EmptySubscriptionState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard 
          key={subscription.id} 
          subscription={subscription}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};