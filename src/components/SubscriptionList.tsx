import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { SubscriptionCard } from "./subscription/SubscriptionCard";
import { SubscriptionEditDialog } from "./subscription/SubscriptionEditDialog";
import { useNavigate } from "react-router-dom";
import { Application } from "@/types/application";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  description?: string;
}

const findAlternatives = (subscription: Subscription, allApps: Application[]) => {
  const currentApp = allApps.find(app => app.name.toLowerCase() === subscription.name.toLowerCase());
  if (!currentApp) return null;

  const alternatives = allApps.filter(app => 
    app.category === currentApp.category && 
    app.price < currentApp.price &&
    app.name.toLowerCase() !== currentApp.name.toLowerCase()
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

const SubscriptionList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

  const { data: subscriptions, isLoading, refetch } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      console.log("Fetching subscriptions...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found, returning empty array");
        return [];
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }

      console.log("Fetched subscriptions:", data);
      return data as Subscription[];
    },
  });

  const { data: applications } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*');
      
      if (error) throw error;
      return data as Application[];
    },
  });

  const handleDelete = async (id: number) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour supprimer un abonnement",
      });
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Abonnement supprimé",
        description: "L'abonnement a été supprimé avec succès",
      });

      refetch();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card className="p-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/20 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          Mes Abonnements Actifs
        </h2>
        
        {subscriptions && subscriptions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={setEditingSubscription}
                onDelete={handleDelete}
                alternative={applications ? findAlternatives(subscription, applications) : null}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-light rounded-xl border border-gray-100">
            <p className="text-gray-500">
              Aucun abonnement actif pour le moment
            </p>
          </div>
        )}
      </Card>

      <SubscriptionEditDialog
        subscription={editingSubscription}
        onClose={() => setEditingSubscription(null)}
        onSuccess={refetch}
      />
    </div>
  );
};

export default SubscriptionList;