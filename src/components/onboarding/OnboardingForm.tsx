import { useState } from "react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingFormData } from "@/types/onboarding";
import { Steps } from "./Steps";
import { StepContent } from "./StepContent";
import { StepNavigation } from "./StepNavigation";
import { StepHeader } from "./StepHeader";

// Import all section components
import { FavoriteSubscriptionsSection } from "./sections/FavoriteSubscriptionsSection";
import { SpendingSection } from "./sections/SpendingSection";
import { PrioritiesSection } from "./sections/PrioritiesSection";
import { ManagementHabitsSection } from "./sections/ManagementHabitsSection";
import { BarriersSection } from "./sections/BarriersSection";
import { DemographicsSection } from "./sections/DemographicsSection";
import { ManagementToolsSection } from "./sections/ManagementToolsSection";
import { NewServicesSection } from "./sections/NewServicesSection";
import { UsageSection } from "./sections/UsageSection";

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

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
    usage_frequency: {},
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
    },
    {
      title: "Utilisation",
      description: "Fréquence d'utilisation",
      component: UsageSection,
      key: "usage_frequency"
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
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
        .insert([{ id: user.id, ...formData }]);

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
          <StepHeader 
            title={currentStepConfig.title}
            description={currentStepConfig.description}
          />

          <Steps currentStep={currentStep} totalSteps={steps.length} />

          <AnimatePresence mode="wait" custom={direction}>
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
          </AnimatePresence>

          <StepNavigation
            currentStep={currentStep}
            totalSteps={steps.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </Card>
      </motion.div>
    </div>
  );
};
