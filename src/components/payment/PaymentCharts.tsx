import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MonthlyEvolutionChart } from "./charts/MonthlyEvolutionChart";
import { CategoryChart } from "./charts/CategoryChart";

const PaymentCharts = () => {
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
      return data;
    }
  });

  const currentMonthTotal = subscriptions?.reduce((total, sub) => total + Number(sub.price), 0) || 0;
  const previousMonthTotal = currentMonthTotal * 1.2;
  const savings = previousMonthTotal - currentMonthTotal;

  // Grouper les dépenses par catégorie avec typage explicite
  const categoryData = subscriptions?.reduce((acc: Record<string, number>, sub) => {
    const category = sub.category || 'Autre';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(sub.price);
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData || {}).map(([name, amount]) => ({
    name,
    montant: Number(amount), // Conversion explicite en nombre
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <MonthlyEvolutionChart 
        currentMonthTotal={currentMonthTotal}
        previousMonthTotal={previousMonthTotal}
        savings={savings}
      />
      <CategoryChart categoryData={categoryChartData} />
    </div>
  );
};

export default PaymentCharts;
