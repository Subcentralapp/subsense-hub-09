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

      // Fetch total count
      const { count } = await supabase
        .from('subscriptions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id);

      // Fetch paginated data
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

      console.log(`Fetched ${data?.length} subscriptions, total: ${count}`);
      return { 
        subscriptions: data || [], 
        total: count || 0,
        totalPages: Math.ceil((count || 0) / PAGE_SIZE)
      };
    },
    staleTime: 3 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const handleDelete = async (id: number) => {
    try {
      // Optimistic update
      const previousData = queryClient.getQueryData<{ subscriptions: Subscription[], total: number }>(["subscriptions", page]);
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
        // Rollback on error
        queryClient.setQueryData(["subscriptions", page], previousData);
        throw error;
      }

      toast({
        title: "Succès",
        description: "L'abonnement a été supprimé avec succès.",
      });

      // Invalidate all subscription queries to update counts
      queryClient.invalidateQueries({ queryKey: ["subscriptions"] });
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'abonnement.",
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
  };
};