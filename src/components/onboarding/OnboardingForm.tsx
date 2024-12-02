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
import { Button } from "@/components/ui/button";
import { SkipDialog } from "./SkipDialog";
import { WelcomeDialog } from "./WelcomeDialog";
import { useOnboardingSubmit } from "@/hooks/useOnboardingSubmit";
import confetti from "canvas-confetti";

// Import all section components
import { FavoriteSubscriptionsSection } from "./sections/FavoriteSubscriptionsSection";
import { SpendingSection } from "./sections/SpendingSection";
import { PrioritiesSection } from "./sections/PrioritiesSection";
import { ManagementHabitsSection } from "./sections/ManagementHabitsSection";
import { BarriersSection } from "./sections/BarriersSection";
import { DemographicsSection } from "./sections/DemographicsSection";
import { ManagementToolsSection } from "./sections/ManagementToolsSection";
import { NewServicesSection } from "./sections/NewServicesSection";

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showSkipDialog, setShowSkipDialog] = useState(false);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { handleSubmit, isSubmitting } = useOnboardingSubmit();

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

  const steps = [
    {
      title: "Vos abonnements",
      description: "Sélectionnez vos services préférés",
      component: FavoriteSubscriptionsSection,
      key: "favorite_subscriptions"
    },
    {
      title: "Budget actuel",
      description: "Estimez vos dépenses mensuelles",
      component: SpendingSection,
      key: "current_monthly_spend"
    },
    {
      title: "Budget cible",
      description: "Définissez votre objectif budgétaire",
      component: SpendingSection,
      key: "target_monthly_budget"
    },
    {
      title: "Priorités",
      description: "Vos critères de choix",
      component: PrioritiesSection,
      key: "subscription_priorities"
    },
    {
      title: "Freins",
      description: "Ce qui vous retient",
      component: BarriersSection,
      key: "subscription_barriers"
    },
    {
      title: "À propos de vous",
      description: "Quelques informations démographiques",
      component: DemographicsSection,
      key: "demographics"
    },
    {
      title: "Outils",
      description: "Vos besoins en gestion",
      component: ManagementToolsSection,
      key: "management_tools"
    },
    {
      title: "Nouveaux services",
      description: "Vos intérêts futurs",
      component: NewServicesSection,
      key: "new_services"
    }
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    } else {
      console.log("Submitting form data:", formData);
      await handleSubmit(formData);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setShowWelcomeDialog(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    setShowSkipDialog(true);
  };

  const handleConfirmSkip = () => {
    navigate("/dashboard");
    toast({
      title: "Bienvenue !",
      description: "Vous pouvez toujours compléter votre profil plus tard dans les paramètres.",
    });
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
          <div className="flex justify-between items-center mb-6">
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-black font-bold hover:text-gray-700"
            >
              Passer
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleSkip}
              className="text-gray-500 hover:text-gray-700"
            >
              Passer la question
            </Button>
          </div>

          <StepHeader 
            title={currentStepConfig.title}
            description={currentStepConfig.description}
          />

          <Steps currentStep={currentStep} totalSteps={steps.length} />

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
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
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