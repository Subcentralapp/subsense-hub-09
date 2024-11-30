import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";
import { startOfMonth, endOfMonth, format } from "date-fns";
import { fr } from "date-fns/locale";

const BudgetManager = () => {
  const { toast } = useToast();
  const [newBudget, setNewBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

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
      
      console.log("Fetching budget for period:", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        userId: user.id
      });

      const { data, error } = await supabase
        .from('budgets')
        .select('*')
        .eq('user_id', user.id)
        .gte('period_start', startDate.toISOString())
        .lte('period_end', endDate.toISOString())
        .maybeSingle();

      if (error) {
        console.error("Error fetching budget:", error);
        throw error;
      }

      console.log("Fetched budget:", data);
      return data;
    },
  });

  // Fetch total expenses for current month
  const { data: totalExpenses = 0 } = useQuery({
    queryKey: ['monthly-expenses'],
    queryFn: async () => {
      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());
      
      const { data, error } = await supabase
        .from('invoicedetails')
        .select('amount')
        .gte('invoice_date', startDate.toISOString())
        .lte('invoice_date', endDate.toISOString());

      if (error) throw error;
      
      return data?.reduce((sum, invoice) => sum + (Number(invoice.amount) || 0), 0) || 0;
    },
  });

  const handleSetBudget = async () => {
    try {
      setIsLoading(true);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("Vous devez être connecté pour définir un budget");
      }

      const amount = parseFloat(newBudget);
      if (isNaN(amount) || amount <= 0) {
        throw new Error("Montant invalide");
      }

      const startDate = startOfMonth(new Date());
      const endDate = endOfMonth(new Date());

      console.log("Tentative de mise à jour du budget:", {
        amount,
        user_id: user.id,
        period_start: startDate,
        period_end: endDate
      });

      // D'abord, supprimons tout budget existant pour ce mois
      const { error: deleteError } = await supabase
        .from('budgets')
        .delete()
        .eq('user_id', user.id)
        .gte('period_start', startDate.toISOString())
        .lte('period_end', endDate.toISOString());

      if (deleteError) {
        console.error("Erreur lors de la suppression de l'ancien budget:", deleteError);
        throw deleteError;
      }

      // Ensuite, insérons le nouveau budget
      const { error: insertError } = await supabase
        .from('budgets')
        .insert({
          amount,
          period_start: startDate.toISOString(),
          period_end: endDate.toISOString(),
          user_id: user.id
        });

      if (insertError) {
        console.error("Erreur Supabase:", insertError);
        throw insertError;
      }

      // Invalidate queries to refresh data
      await queryClient.invalidateQueries({ queryKey: ['current-budget'] });
      await queryClient.invalidateQueries({ queryKey: ['monthly-expenses'] });

      toast({
        title: "Budget mis à jour",
        description: "Votre budget mensuel a été mis à jour avec succès.",
      });

      setNewBudget("");
    } catch (error: any) {
      console.error('Error setting budget:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de la mise à jour du budget.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    return "bg-primary";
  };

  const currentBudget = budget?.amount || 0;
  const spentPercentage = currentBudget ? (totalExpenses / currentBudget) * 100 : 0;
  const remaining = Math.max(currentBudget - totalExpenses, 0);

  return (
    <Card className="p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold mb-1">Budget Mensuel</h2>
          <p className="text-sm text-gray-500">
            {format(new Date(), 'MMMM yyyy', { locale: fr })}
          </p>
        </div>
        {spentPercentage >= 90 && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1 rounded-full">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Budget dépassé</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Dépensé: {totalExpenses.toFixed(2)} €</span>
          <span>Budget: {currentBudget.toFixed(2)} €</span>
        </div>
        <Progress 
          value={Math.min(spentPercentage, 100)} 
          className={`h-2 ${getProgressColor(spentPercentage)}`}
        />
        <p className="text-sm text-gray-500">
          Restant: <span className="font-medium">{remaining.toFixed(2)} €</span>
        </p>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
            placeholder="Définir un nouveau budget"
            className="pr-8"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
        </div>
        <Button onClick={handleSetBudget} disabled={isLoading}>
          {isLoading ? "Mise à jour..." : "Mettre à jour"}
        </Button>
      </div>
    </Card>
  );
};

export default BudgetManager;