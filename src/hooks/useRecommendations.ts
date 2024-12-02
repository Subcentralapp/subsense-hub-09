import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";

export const useRecommendations = (refreshKey: number) => {
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data || [];
    },
  });

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendations', refreshKey, subscriptions],
    queryFn: async () => {
      console.log("Fetching smart recommendations...");
      if (!subscriptions) return [];

      const { data: allApps, error } = await supabase
        .from('applications')
        .select('*');

      if (error) throw error;
      
      const existingAppNames = new Set(subscriptions.map(sub => 
        sub.name.toLowerCase()
      ));
      
      const availableApps = (allApps || []).filter(app => 
        !existingAppNames.has(app.name.toLowerCase())
      );

      const userCategories = new Set(subscriptions.map(sub => sub.category));
      
      const prioritizedApps = availableApps.sort((a, b) => {
        const aInUserCategory = userCategories.has(a.category || '');
        const bInUserCategory = userCategories.has(b.category || '');
        if (aInUserCategory && !bInUserCategory) return -1;
        if (!aInUserCategory && bInUserCategory) return 1;
        return 0;
      });

      return prioritizedApps.slice(0, 3);
    },
    enabled: !!subscriptions,
  });

  return { recommendations, isLoading };
};
