import { Card } from "@/components/ui/card";
import { SubscriptionProgress } from "./SubscriptionProgress";
import { Subscription } from "@/types/subscription";
import { SubscriptionCard } from "./SubscriptionCard";
import { EmptySubscriptionState } from "./EmptySubscriptionState";

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {subscriptions.map((subscription) => (
        <Card key={subscription.id} className="p-6 space-y-4">
          <SubscriptionCard
            subscription={subscription}
            onEdit={() => onEdit(subscription)}
            onDelete={() => onDelete(subscription.id)}
          />
          <SubscriptionProgress
            subscriptionId={subscription.id}
            nextBilling={subscription.next_billing || new Date().toISOString()}
            isTrial={subscription.is_trial}
            trialEndDate={subscription.trial_end_date}
          />
        </Card>
      ))}
    </div>
  );
};