import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { SubscriptionEditDialog } from "./subscription/SubscriptionEditDialog";
import { useNavigate } from "react-router-dom";
import { Application } from "@/types/application";
import { SubscriptionHeader } from "./subscription/SubscriptionHeader";
import { EmptySubscriptionState } from "./subscription/EmptySubscriptionState";
import { SubscriptionGrid } from "./subscription/SubscriptionGrid";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  description?: string;
}

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
        <SubscriptionHeader />
        
        {subscriptions && subscriptions.length > 0 ? (
          <SubscriptionGrid 
            subscriptions={subscriptions}
            onEdit={setEditingSubscription}
            onDelete={handleDelete}
            applications={applications}
          />
        ) : (
          <EmptySubscriptionState />
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
