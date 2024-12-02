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
    console.log("🚀 Début de la soumission du formulaire");
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("❌ Aucun utilisateur connecté");
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour continuer",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log("👤 Utilisateur connecté:", user.id);
      console.log("📝 Données à enregistrer:", formData);

      // Vérifier si une entrée existe déjà
      const { data: existingPrefs, error: fetchError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("❌ Erreur lors de la vérification des préférences:", fetchError);
        throw fetchError;
      }

      let result;
      if (existingPrefs) {
        console.log("🔄 Mise à jour des préférences pour l'utilisateur:", user.id);
        result = await supabase
          .from('user_preferences')
          .update({
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
            revenue_percentage: formData.revenue_percentage
          })
          .eq('id', user.id);
      } else {
        console.log("➕ Insertion de nouvelles préférences pour l'utilisateur:", user.id);
        result = await supabase
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
            revenue_percentage: formData.revenue_percentage
          }]);
      }

      if (result.error) {
        console.error("❌ Erreur lors de l'enregistrement:", result.error);
        throw result.error;
      }

      console.log("✅ Données enregistrées avec succès");
      toast({
        title: "Profil complété !",
        description: "Nous avons personnalisé votre tableau de bord selon vos réponses.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Erreur dans handleSubmit:", error);
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