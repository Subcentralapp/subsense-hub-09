import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Steps } from "./Steps";
import { FavoriteSubscriptions } from "./steps/FavoriteSubscriptions";
import { MonthlySpend } from "./steps/MonthlySpend";
import { TargetBudget } from "./steps/TargetBudget";
import { Priorities } from "./steps/Priorities";
import { ManagementHabits } from "./steps/ManagementHabits";
import { Recommendations } from "./steps/Recommendations";
import { Notifications } from "./steps/Notifications";

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
  const totalSteps = 7;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleUpdateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

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

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <FavoriteSubscriptions
            value={formData.favorite_subscriptions}
            onChange={(value) => handleUpdateFormData("favorite_subscriptions", value)}
          />
        );
      case 1:
        return (
          <MonthlySpend
            value={formData.current_monthly_spend}
            onChange={(value) => handleUpdateFormData("current_monthly_spend", value)}
          />
        );
      case 2:
        return (
          <TargetBudget
            value={formData.target_monthly_budget}
            onChange={(value) => handleUpdateFormData("target_monthly_budget", value)}
          />
        );
      case 3:
        return (
          <Priorities
            value={formData.subscription_priorities}
            onChange={(value) => handleUpdateFormData("subscription_priorities", value)}
          />
        );
      case 4:
        return (
          <ManagementHabits
            value={formData.management_habits}
            onChange={(value) => handleUpdateFormData("management_habits", value)}
          />
        );
      case 5:
        return (
          <Recommendations
            value={formData.wants_recommendations}
            onChange={(value) => handleUpdateFormData("wants_recommendations", value)}
          />
        );
      case 6:
        return (
          <Notifications
            value={formData.notification_preferences}
            onChange={(value) => handleUpdateFormData("notification_preferences", value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Aidez-nous à personnaliser votre expérience !
          </h1>
          <p className="text-sm text-muted-foreground">
            Ces informations nous aident à vous offrir une meilleure expérience et restent strictement confidentielles.
          </p>
        </div>

        <Progress value={(currentStep / (totalSteps - 1)) * 100} className="h-2" />
        
        <Steps currentStep={currentStep} totalSteps={totalSteps} />

        <div className="min-h-[300px]">
          {renderStep()}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>

          {currentStep === totalSteps - 1 ? (
            <Button onClick={handleSubmit}>
              Terminer
            </Button>
          ) : (
            <Button onClick={handleNext}>
              Suivant
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};