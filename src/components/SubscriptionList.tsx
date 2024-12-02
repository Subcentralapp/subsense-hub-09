import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { SubscriptionCard } from "./subscription/SubscriptionCard";
import { SubscriptionHeader } from "./subscription/SubscriptionHeader";
import { EmptySubscriptionState } from "./subscription/EmptySubscriptionState";
import ApplicationList from "./ApplicationList";

const SubscriptionList = () => {
  const { data: subscriptions, isLoading } = useQuery({
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
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
      <div className="flex justify-between items-center">
        <SubscriptionHeader />
        <ApplicationList />
      </div>
      
      {!subscriptions || subscriptions.length === 0 ? (
        <EmptySubscriptionState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subscriptions.map((subscription) => (
            <SubscriptionCard 
              key={subscription.id} 
              subscription={subscription}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;