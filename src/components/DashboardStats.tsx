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
    <div className="p-4 space-y-8">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        Vue d'ensemble
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-none hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 p-2">
            <DollarSign className="h-12 w-12 text-primary/20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500">Coût Mensuel</p>
            <p className="text-3xl font-bold text-primary mt-2">
              {monthlyTotal.toFixed(2)}€
            </p>
            <div className="mt-4 text-xs text-gray-500">
              {subscriptionCount} abonnements actifs
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-secondary/5 to-secondary/10 border-none hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 p-2">
            <Calendar className="h-12 w-12 text-secondary/20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500">Coût Annuel</p>
            <p className="text-3xl font-bold text-secondary mt-2">
              {yearlyTotal.toFixed(2)}€
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Projection sur 12 mois
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-neutral/5 to-neutral/10 border-none hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 p-2">
            <TrendingUp className="h-12 w-12 text-neutral/20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500">Moyenne / Mois</p>
            <p className="text-3xl font-bold text-neutral mt-2">
              {subscriptionCount ? (monthlyTotal / subscriptionCount).toFixed(2) : "0.00"}€
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Par abonnement
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-none hover:shadow-lg transition-all duration-300">
          <div className="absolute top-0 right-0 p-2">
            <Award className="h-12 w-12 text-primary/20" />
          </div>
          <div className="p-6">
            <p className="text-sm font-medium text-gray-500">Plus Coûteux</p>
            <p className="text-xl font-bold text-primary mt-2 truncate">
              {mostExpensive}
            </p>
            <div className="mt-4 text-xs text-gray-500">
              Abonnement principal
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStats;