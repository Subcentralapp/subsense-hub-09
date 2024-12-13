import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Subscription } from "@/types/subscription";

const PAGE_SIZE = 6;

export const useSubscriptions = (page: number = 1) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["subscriptions", page],
    queryFn: async () => {
      console.log("Fetching subscriptions for page:", page);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found, returning empty array");
        return { subscriptions: [], total: 0 };
      }

      const { count } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }

      console.log("Subscriptions fetched successfully:", data?.length);
      return { 
        subscriptions: data || [], 
        total: count || 0,
        totalPages: Math.ceil((count || 0) / PAGE_SIZE)
      };
    },
    staleTime: Infinity, // Ne jamais considérer les données comme périmées
    gcTime: 24 * 60 * 60 * 1000, // 24 heures
    refetchOnWindowFocus: false,
    retry: 1
  });

  const handleDelete = async (id: number) => {
    try {
      const previousData = queryClient.getQueryData<{ subscriptions: Subscription[], total: number }>(["subscriptions", page]);
      
      // Mise à jour optimiste
      queryClient.setQueryData(["subscriptions", page], (old: any) => ({
        ...old,
        subscriptions: old.subscriptions.filter((sub: Subscription) => sub.id !== id),
        total: (old.total || 0) - 1
      }));

      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) {
        queryClient.setQueryData(["subscriptions", page], previousData);
        throw error;
      }

      toast({
        title: "Succès",
        description: "L'abonnement a été supprimé avec succès.",
      });

      // Mise à jour silencieuse du cache des paiements à venir
      queryClient.setQueryData(["upcomingPayments"], (oldData: any) => {
        if (!oldData) return [];
        return oldData.filter((payment: any) => payment.id !== id);
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

  const updateNextBillingDate = async (subscriptionId: number, newDate: Date) => {
    try {
      console.log("Updating next billing date for subscription", subscriptionId, "to", newDate);
      const { error } = await supabase
        .from('subscriptions')
        .update({ next_billing: newDate.toISOString() })
        .eq('id', subscriptionId);

      if (error) throw error;

      // Mise à jour silencieuse du cache
      queryClient.setQueryData(["subscriptions", page], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          subscriptions: old.subscriptions.map((sub: Subscription) =>
            sub.id === subscriptionId ? { ...sub, next_billing: newDate.toISOString() } : sub
          )
        };
      });

      // Mise à jour silencieuse du cache des paiements à venir
      queryClient.setQueryData(["upcomingPayments"], (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((payment: any) =>
          payment.id === subscriptionId 
            ? { ...payment, next_billing: newDate.toISOString() }
            : payment
        );
      });

    } catch (error) {
      console.error("Error updating next billing date:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de la date.",
        variant: "destructive",
      });
    }
  };

  return {
    subscriptions: data?.subscriptions || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    isLoading,
    refetch,
    handleDelete,
    updateNextBillingDate,
  };
};