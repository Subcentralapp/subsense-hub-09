import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { FavoriteSubscriptionsSection } from "./sections/FavoriteSubscriptionsSection";
import { SpendingSection } from "./sections/SpendingSection";
import { PrioritiesSection } from "./sections/PrioritiesSection";
import { ManagementHabitsSection } from "./sections/ManagementHabitsSection";
import { RecommendationsSection } from "./sections/RecommendationsSection";
import { NotificationsSection } from "./sections/NotificationsSection";

export const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    favorite_subscriptions: [] as string[],
    current_monthly_spend: "",
    target_monthly_budget: "",
    subscription_priorities: [] as string[],
    management_habits: "",
    wants_recommendations: true,
    notification_preferences: [] as string[],
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour continuer",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_preferences')
        .insert([
          {
            id: user.id,
            ...formData,
          },
        ]);

      if (error) throw error;

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
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Personnalisez votre expérience en quelques clics !
          </h1>
          <p className="text-sm text-muted-foreground">
            Répondez à ces questions pour un tableau de bord adapté à vos besoins.
          </p>
        </div>

        <div className="space-y-8">
          <FavoriteSubscriptionsSection
            value={formData.favorite_subscriptions}
            onChange={(value) => setFormData(prev => ({ ...prev, favorite_subscriptions: value }))}
          />

          <SpendingSection
            title="Votre estimation de dépenses mensuelles"
            value={formData.current_monthly_spend}
            onChange={(value) => setFormData(prev => ({ ...prev, current_monthly_spend: value }))}
          />

          <SpendingSection
            title="Votre budget mensuel cible"
            value={formData.target_monthly_budget}
            onChange={(value) => setFormData(prev => ({ ...prev, target_monthly_budget: value }))}
          />

          <PrioritiesSection
            value={formData.subscription_priorities}
            onChange={(value) => setFormData(prev => ({ ...prev, subscription_priorities: value }))}
          />

          <ManagementHabitsSection
            value={formData.management_habits}
            onChange={(value) => setFormData(prev => ({ ...prev, management_habits: value }))}
          />

          <RecommendationsSection
            value={formData.wants_recommendations}
            onChange={(value) => setFormData(prev => ({ ...prev, wants_recommendations: value }))}
          />

          <NotificationsSection
            value={formData.notification_preferences}
            onChange={(value) => setFormData(prev => ({ ...prev, notification_preferences: value }))}
          />

          <div className="flex justify-end pt-4">
            <Button onClick={handleSubmit} size="lg">
              Terminer
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};