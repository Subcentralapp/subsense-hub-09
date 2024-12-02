import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { fr } from "date-fns/locale";
import { BudgetForm } from "./BudgetForm";
import { BudgetProgress } from "./BudgetProgress";
import { Wallet } from "lucide-react";

const BudgetManager = () => {
  // Fetch current budget
  const { data: budget, isLoading: isBudgetLoading } = useQuery({
    queryKey: ['current-budget'],
    queryFn: async () => {
      console.log("Fetching current budget...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found when fetching budget");
        return null;
      }

      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());
      
      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .gte('period_start', startDate.toISOString())
        .lte('period_end', endDate.toISOString())
        .maybeSingle();

      if (error) throw error;
      console.log("Current budget data:", data);
      return data;
    },
    refetchInterval: 5000, // Rafraîchir toutes les 5 secondes
    staleTime: 0, // Considérer les données comme périmées immédiatement
    gcTime: 0, // Ne pas mettre en cache les données (anciennement cacheTime)
  });

  // Fetch total expenses (subscriptions) for current month
  const { data: totalExpenses = 0 } = useQuery({
    queryKey: ['monthly-expenses'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { data, error } = await supabase
        .from('subscriptions')
        .select('price')
        .eq('user_id', user.id);

      if (error) throw error;
      const total = data?.reduce((sum, sub) => sum + (Number(sub.price) || 0), 0) || 0;
      console.log("Total monthly expenses:", total);
      return total;
    },
    staleTime: 0,
    gcTime: 0, // Anciennement cacheTime
  });

  const currentBudget = budget?.amount || 0;
  const spentPercentage = currentBudget ? (totalExpenses / currentBudget) * 100 : 0;

  if (isBudgetLoading) {
    return (
      <Card className="p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 bg-gray-200 rounded"></div>
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Budget Mensuel</h2>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {format(new Date(), 'MMMM yyyy', { locale: fr })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Budget total</p>
          <p className="text-xl font-semibold text-primary">
            {currentBudget.toFixed(2)} €
          </p>
        </div>
      </div>

      <BudgetProgress 
        currentBudget={currentBudget}
        totalExpenses={totalExpenses}
        spentPercentage={spentPercentage}
      />

      <BudgetForm />
    </Card>
  );
};

export default BudgetManager;