import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { fr } from "date-fns/locale";
import { BudgetForm } from "./BudgetForm";
import { BudgetProgress } from "./BudgetProgress";

const BudgetManager = () => {
  // Fetch current budget
  const { data: budget } = useQuery({
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
      return data;
    },
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
      return data?.reduce((sum, sub) => sum + (Number(sub.price) || 0), 0) || 0;
    },
  });

  const currentBudget = budget?.amount || 0;
  const spentPercentage = currentBudget ? (totalExpenses / currentBudget) * 100 : 0;

  return (
    <Card className="p-6 space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-1">Budget Mensuel</h2>
        <p className="text-sm text-gray-500">
          {format(new Date(), 'MMMM yyyy', { locale: fr })}
        </p>
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