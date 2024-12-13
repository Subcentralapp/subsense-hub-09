import { Card } from "@/components/ui/card";
import { SubscriptionHeader } from "./subscription/SubscriptionHeader";
import ApplicationList from "./ApplicationList";
import { useState } from "react";
import { SubscriptionEditDialog } from "./subscription/SubscriptionEditDialog";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { SubscriptionContent } from "./subscription/SubscriptionContent";
import { Subscription } from "@/types/subscription";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SubscriptionList = () => {
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { subscriptions, isLoading, refetch, handleDelete, totalPages } = useSubscriptions(currentPage);

  const handleEdit = (subscription: Subscription) => {
    console.log("Editing subscription:", subscription);
    setEditingSubscription(subscription);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
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

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

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