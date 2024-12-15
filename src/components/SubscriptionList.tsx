import { Card } from "@/components/ui/card";
import { SubscriptionHeader } from "./subscription/SubscriptionHeader";
import ApplicationList from "./ApplicationList";
import { useState, useMemo } from "react";
import { SubscriptionEditDialog } from "./subscription/SubscriptionEditDialog";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { SubscriptionContent } from "./subscription/SubscriptionContent";
import { Subscription } from "@/types/subscription";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { Alert, AlertDescription } from "./ui/alert";
import { Link } from "react-router-dom";

const SubscriptionList = () => {
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { subscriptions, isLoading, error, refetch, handleDelete, totalPages } = useSubscriptions(currentPage);

  const hasSimilarApps = useMemo(() => {
    if (!subscriptions) return false;
    
    // Créer un objet qui regroupe les abonnements par catégorie
    const categoryCounts = subscriptions.reduce((acc: Record<string, number>, sub) => {
      if (sub.category) {
        acc[sub.category] = (acc[sub.category] || 0) + 1;
      }
      return acc;
    }, {});

    // Vérifier s'il existe au moins une catégorie avec plus d'une application
    return Object.values(categoryCounts).some((count: number) => count > 1);
  }, [subscriptions]);

  const handleEdit = (subscription: Subscription) => {
    console.log("Editing subscription:", subscription);
    setEditingSubscription(subscription);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Changing to page:", newPage);
    setCurrentPage(newPage);
  };

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-red-500">Une erreur est survenue lors du chargement des abonnements.</p>
        <Button onClick={() => refetch()} className="mt-4">Réessayer</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {hasSimilarApps && (
        <Alert className="bg-orange-50 text-orange-800 border-orange-200">
          <AlertDescription className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
            <span>Vous possédez des applications similaires, des économies sont possibles.</span>
            <Link to="/dashboard/compare">
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-100">
                Comparer mes applications
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <SubscriptionHeader />
        <ApplicationList />
      </div>
      
      {isLoading ? (
        <Card className="p-6">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
                <Skeleton className="h-8 w-[100px]" />
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <SubscriptionContent 
          subscriptions={subscriptions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

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