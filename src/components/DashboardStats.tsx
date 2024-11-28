import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, Award } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const DashboardStats = () => {
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      console.log("Fetching subscriptions for dashboard stats...");
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

      console.log("Fetched subscriptions for stats:", data);
      return data;
    }
  });

  // Calculate statistics
  const monthlyTotal = subscriptions?.reduce((sum, sub) => sum + Number(sub.price), 0) || 0;
  const yearlyTotal = monthlyTotal * 12;
  const subscriptionCount = subscriptions?.length || 0;
  const mostExpensive = subscriptions?.reduce((max, sub) => 
    (!max || Number(sub.price) > Number(max.price)) ? sub : max, 
    null as any
  )?.name || '-';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Coût Mensuel</p>
            <p className="text-2xl font-semibold">{monthlyTotal.toFixed(2)} €</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-secondary/10 rounded-full">
            <Calendar className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Coût Annuel</p>
            <p className="text-2xl font-semibold">{yearlyTotal.toFixed(2)} €</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-neutral/10 rounded-full">
            <TrendingUp className="h-6 w-6 text-neutral" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Abonnements</p>
            <p className="text-2xl font-semibold">{subscriptionCount}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Plus Coûteux</p>
            <p className="text-2xl font-semibold">{mostExpensive}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;