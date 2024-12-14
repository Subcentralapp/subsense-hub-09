import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MonthlyEvolutionChart } from "./MonthlyEvolutionChart";
import { CategoryChart } from "./CategoryChart";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const PaymentCharts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ['payment-charts-subscriptions'],
    queryFn: async () => {
      try {
        console.log("PaymentCharts - Fetching subscriptions...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("PaymentCharts - Session error:", sessionError);
          toast({
            title: "Erreur de session",
            description: "Votre session a expiré. Veuillez vous reconnecter.",
            variant: "destructive",
          });
          navigate("/identification");
          throw sessionError;
        }

        if (!session) {
          console.log("PaymentCharts - No session found, redirecting...");
          navigate("/identification");
          return { subscriptions: [] };
        }

        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id);

        if (error) {
          console.error("PaymentCharts - Error fetching subscriptions:", error);
          if (error.message.includes('JWT') || error.message.includes('session')) {
            toast({
              title: "Session expirée",
              description: "Votre session a expiré. Veuillez vous reconnecter.",
              variant: "destructive",
            });
            // Déconnexion explicite en cas d'erreur de session
            await supabase.auth.signOut();
            navigate("/identification");
          }
          throw error;
        }

        console.log("PaymentCharts - Fetched subscriptions:", data);
        return { subscriptions: data || [] };
      } catch (error) {
        console.error("PaymentCharts - Error:", error);
        return { subscriptions: [] };
      }
    },
    initialData: { subscriptions: [] },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 1
  });

  // S'assurer que subscriptions est toujours un tableau
  const subscriptions = Array.isArray(data?.subscriptions) ? data.subscriptions : [];

  const currentMonthTotal = subscriptions.reduce((total, sub) => total + Number(sub.price), 0);
  const previousMonthTotal = currentMonthTotal * 1.2; // Simulation pour l'exemple
  const savings = previousMonthTotal - currentMonthTotal;

  // Grouper les dépenses par catégorie avec typage explicite
  const categoryData = subscriptions.reduce((acc: Record<string, number>, sub) => {
    const category = sub.category || 'Autre';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(sub.price);
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData || {}).map(([name, amount]) => ({
    name,
    montant: Number(amount),
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