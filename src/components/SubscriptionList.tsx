import { Card } from "@/components/ui/card";
import { SubscriptionHeader } from "./subscription/SubscriptionHeader";
import ApplicationList from "./ApplicationList";
import { useState } from "react";
import { SubscriptionEditDialog } from "./subscription/SubscriptionEditDialog";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { SubscriptionContent } from "./subscription/SubscriptionContent";
import { Subscription } from "@/types/subscription";

const SubscriptionList = () => {
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const { subscriptions, isLoading, refetch, handleDelete } = useSubscriptions();

  const handleEdit = (subscription: Subscription) => {
    console.log("Editing subscription:", subscription);
    setEditingSubscription(subscription);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SubscriptionHeader />
          <ApplicationList />
        </div>
        <Card className="p-6">
          <p>Chargement des abonnements...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SubscriptionHeader />
        <ApplicationList />
      </div>
      
      <SubscriptionContent 
        subscriptions={subscriptions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SubscriptionEditDialog
        subscription={editingSubscription}
        onClose={() => setEditingSubscription(null)}
        onSuccess={() => {
          setEditingSubscription(null);
          refetch();
        }}
      />
    </div>
  );
};

export default SubscriptionList;