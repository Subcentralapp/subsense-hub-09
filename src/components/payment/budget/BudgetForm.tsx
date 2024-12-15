import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { startOfMonth, endOfMonth } from "date-fns";

export const BudgetForm = () => {
  const { toast } = useToast();
  const [newBudget, setNewBudget] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleSetBudget = async () => {
    console.log("Tentative de mise à jour du budget:", newBudget);
    try {
      setIsLoading(true);
      
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log("Utilisateur récupéré:", user?.id);
      
      if (userError || !user) {
        console.error("Erreur d'authentification:", userError);
        throw new Error("Vous devez être connecté pour définir un budget");
      }

      const amount = parseFloat(newBudget);
      if (isNaN(amount) || amount <= 0) {
        console.error("Montant invalide:", newBudget);
        throw new Error("Le montant doit être un nombre positif");
      }

      const currentDate = new Date();
      const startDate = startOfMonth(currentDate);
      const endDate = endOfMonth(currentDate);

      console.log("Période du budget:", {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });

      const { error: deleteError } = await supabase
        .from('budgets')
        .delete()
        .eq('user_id', user.id)
        .gte('period_start', startDate.toISOString())
        .lte('period_end', endDate.toISOString());

      if (deleteError) {
        console.error("Erreur lors de la suppression:", deleteError);
        throw deleteError;
      }

      const { data: insertedBudget, error: insertError } = await supabase
        .from('budgets')
        .insert({
          amount,
          period_start: startDate.toISOString(),
          period_end: endDate.toISOString(),
          user_id: user.id
        })
        .select()
        .single();

      if (insertError) {
        console.error("Erreur lors de l'insertion:", insertError);
        throw insertError;
      }

      console.log("Budget inséré avec succès:", insertedBudget);

      await queryClient.invalidateQueries({ queryKey: ['current-budget'] });
      await queryClient.invalidateQueries({ queryKey: ['monthly-expenses'] });

      toast({
        title: "Budget mis à jour",
        description: `Votre budget mensuel de ${amount}€ a été mis à jour avec succès.`,
      });

      setNewBudget("");
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du budget:', error);
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
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="relative flex-1">
        <Input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(e.target.value)}
          placeholder="Définir un nouveau budget"
          className="pr-8 text-sm sm:text-base"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
      </div>
      <Button onClick={handleSetBudget} disabled={isLoading} className="text-sm sm:text-base whitespace-nowrap">
        {isLoading ? "Mise à jour..." : "Mettre à jour"}
      </Button>
    </div>
  );
};