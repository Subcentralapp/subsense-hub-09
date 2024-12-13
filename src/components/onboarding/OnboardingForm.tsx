import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { OnboardingFormData } from "@/types/onboarding";
import { Steps } from "./Steps";
import { StepContent } from "./StepContent";
import { StepNavigation } from "./StepNavigation";
import { StepHeader } from "./StepHeader";
import { SkipDialog } from "./SkipDialog";
import { WelcomeDialog } from "./WelcomeDialog";
import { useOnboardingSubmit } from "@/hooks/useOnboardingSubmit";
import { useOnboardingSteps } from "./hooks/useOnboardingSteps";
import { OnboardingHeader } from "./components/OnboardingHeader";
import confetti from "canvas-confetti";

export const OnboardingForm = () => {
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleSubmit, isSubmitting } = useOnboardingSubmit();
  const { currentStep, direction, steps, handleNext, handlePrevious, totalSteps } = useOnboardingSteps();

  const [formData, setFormData] = useState<OnboardingFormData>({
    favorite_subscriptions: [],
    current_monthly_spend: "",
    target_monthly_budget: "",
    subscription_priorities: [],
    management_habits: "",
    wants_recommendations: true,
    subscription_barriers: [],
    age_range: "",
    region: "",
    has_used_management_app: false,
    desired_features: [],
    interested_services: [],
    revenue_percentage: "",
  });

  const handleSkip = () => {
    setShowSkipDialog(true);
  };

  const handleConfirmSkip = async () => {
    try {
      console.log("🔄 Redirection vers le dashboard après skip...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("❌ Pas d'utilisateur trouvé lors du skip");
        return;
      }

      // Créer des préférences par défaut pour éviter de revenir à l'onboarding
      const { error: preferencesError } = await supabase
        .from('user_preferences')
        .upsert({
          id: user.id,
          wants_recommendations: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (preferencesError) {
        console.error("❌ Erreur lors de la création des préférences par défaut:", preferencesError);
        throw preferencesError;
      }

      setShowSkipDialog(false);
      toast({
        title: "Bienvenue !",
        description: "Vous pouvez toujours compléter votre profil plus tard dans les paramètres.",
      });
      
      // Utiliser replace: true pour éviter l'empilement dans l'historique
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("❌ Erreur lors du skip:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleFinalSubmit = async () => {
    try {
      console.log("📝 Soumission du formulaire:", formData);
      await handleSubmit(formData);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setShowWelcomeDialog(true);
      
      // Rediriger vers le dashboard après un court délai
      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 2000);
    } catch (error) {
      console.error("❌ Erreur lors de la soumission:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde de vos préférences.",
        variant: "destructive",
      });
    }
  };

  const currentStepConfig = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-6 shadow-lg border-primary/10 relative overflow-hidden">
          <OnboardingHeader onSkip={handleSkip} />

          <StepHeader 
            title={currentStepConfig.title}
            description={currentStepConfig.description}
          />

          <Steps currentStep={currentStep} totalSteps={totalSteps} />

          <StepContent
            currentStep={currentStep}
            direction={direction}
            StepComponent={currentStepConfig.component}
            formData={formData}
            stepKey={currentStepConfig.key}
            onChange={(value: any) => 
              setFormData(prev => ({ 
                ...prev, 
                [currentStepConfig.key]: value 
              }))
            }
          />

          <StepNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrevious}
            onNext={currentStep === totalSteps - 1 ? handleFinalSubmit : handleNext}
            isSubmitting={isSubmitting}
          />
        </Card>
      </motion.div>

      <SkipDialog
        open={showSkipDialog}
        onOpenChange={setShowSkipDialog}
        onConfirm={handleConfirmSkip}
      />

      <WelcomeDialog 
        open={showWelcomeDialog}
        onOpenChange={setShowWelcomeDialog}
      />
    </div>
  );
};