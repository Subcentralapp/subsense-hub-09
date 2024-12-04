import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Subscription } from "@/types/subscription";

export const useSubscriptions = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscriptions, isLoading, refetch } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: async () => {
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

      return data;
    },
    staleTime: 3 * 60 * 1000, // Data remains fresh for 3 minutes
    gcTime: 15 * 60 * 1000,   // Keep unused data for 15 minutes
    refetchOnWindowFocus: false,
  });

  const handleDelete = async (id: number) => {
    try {
      // Optimistic update
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(["subscriptions"]);
      queryClient.setQueryData(["subscriptions"], (old: Subscription[] | undefined) => 
        old?.filter(sub => sub.id !== id)
      );

      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) {
        // Rollback on error
        queryClient.setQueryData(["subscriptions"], previousSubscriptions);
        throw error;
      }

      toast({
        title: "Succès",
        description: "L'abonnement a été supprimé avec succès.",
      });
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'abonnement.",
        variant: "destructive",
      });
    }
  };

  const updateNextBillingDate = async (id: number, nextBilling: Date) => {
    try {
      // Optimistic update
      const previousSubscriptions = queryClient.getQueryData<Subscription[]>(["subscriptions"]);
      queryClient.setQueryData(["subscriptions"], (old: Subscription[] | undefined) => 
        old?.map(sub => sub.id === id ? { ...sub, next_billing: nextBilling.toISOString() } : sub)
      );

      const { error } = await supabase
        .from('subscriptions')
        .update({ next_billing: nextBilling.toISOString() })
        .eq('id', id);

      if (error) {
        // Rollback on error
        queryClient.setQueryData(["subscriptions"], previousSubscriptions);
        throw error;
      }

      console.log("Next billing date updated successfully:", nextBilling);
    } catch (error) {
      console.error("Error updating next billing date:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la date de prochain paiement.",
        variant: "destructive",
      });
    }
  };

  return {
    subscriptions,
    isLoading,
    refetch,
    handleDelete,
    updateNextBillingDate
  };
};