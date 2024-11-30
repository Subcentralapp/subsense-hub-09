import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";

export const BudgetForm = () => {
  const { toast } = useToast();
  const [newBudget, setNewBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

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

      const startDate = new Date();
      startDate.setDate(1); // Premier jour du mois
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Dernier jour du mois

      // Suppression de l'ancien budget
      await supabase
        .from('budgets')
        .delete()
        .eq('user_id', user.id)
        .gte('period_start', startDate.toISOString())
        .lte('period_end', endDate.toISOString());

      // Insertion du nouveau budget
      const { error: insertError } = await supabase
        .from('budgets')
        .insert({
          amount,
          period_start: startDate.toISOString(),
          period_end: endDate.toISOString(),
          user_id: user.id
        });

      if (insertError) throw insertError;

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

  return (
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
  );
};