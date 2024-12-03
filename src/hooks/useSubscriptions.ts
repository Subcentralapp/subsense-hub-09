import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Subscription } from "@/types/subscription";
import { addMonths } from "date-fns";

export const useSubscriptions = () => {
  const { toast } = useToast();

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
    }
  });

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "L'abonnement a été supprimé avec succès.",
      });

      refetch();
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
      const { error } = await supabase
        .from('subscriptions')
        .update({ next_billing: nextBilling.toISOString() })
        .eq('id', id);

      if (error) throw error;

      console.log("Next billing date updated successfully:", nextBilling);
      refetch();
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