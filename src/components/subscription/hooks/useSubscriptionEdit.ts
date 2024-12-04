import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Subscription } from "@/types/subscription";

export const useSubscriptionEdit = (
  subscription: Subscription | null,
  onSuccess: () => void,
  onClose: () => void
) => {
  const [formData, setFormData] = useState<Partial<Subscription>>(subscription || {});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscription?.id) return;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('subscriptions')
        .update({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          next_billing: formData.next_billing,
          description: formData.description
        })
        .eq('id', subscription.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "L'abonnement a été mis à jour"
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    isLoading,
    handleSubmit
  };
};