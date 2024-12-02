import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { OnboardingFormData } from "@/types/onboarding";

export const useOnboardingSubmit = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (formData: OnboardingFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour continuer",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log("Submitting onboarding data:", formData);
      const { error } = await supabase
        .from('user_preferences')
        .insert([{ 
          id: user.id,
          favorite_subscriptions: formData.favorite_subscriptions,
          current_monthly_spend: formData.current_monthly_spend,
          target_monthly_budget: formData.target_monthly_budget,
          subscription_priorities: formData.subscription_priorities,
          management_habits: formData.management_habits,
          wants_recommendations: formData.wants_recommendations,
          subscription_barriers: formData.subscription_barriers,
          age_range: formData.age_range,
          region: formData.region,
          has_used_management_app: formData.has_used_management_app,
          desired_features: formData.desired_features,
          interested_services: formData.interested_services,
          revenue_percentage: formData.revenue_percentage,
          usage_frequency: formData.usage_frequency
        }]);

      if (error) throw error;

      console.log("Onboarding data submitted successfully");
      toast({
        title: "Profil complété !",
        description: "Nous avons personnalisé votre tableau de bord selon vos réponses.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de vos préférences",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting };
};