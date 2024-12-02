import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OnboardingFormData } from "@/types/onboarding";
import { Steps } from "./Steps";

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

  const CurrentStepComponent = steps[currentStep].component;
  const currentStepKey = steps[currentStep].key;

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-8 space-y-8 shadow-lg border-primary/10 relative overflow-hidden">
          <div className="space-y-2 text-center">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Personnalisez votre expérience
            </motion.h1>
            <motion.p 
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {steps[currentStep].description}
            </motion.p>
          </div>

          <Steps currentStep={currentStep} totalSteps={steps.length} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="relative min-h-[400px]"
            >
              <CurrentStepComponent
                value={formData[currentStepKey as keyof OnboardingFormData]}
                onChange={(value: any) => 
                  setFormData(prev => ({ 
                    ...prev, 
                    [currentStepKey]: value 
                  }))
                }
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between pt-4">
            <Button
              onClick={handlePrevious}
              variant="outline"
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Précédent
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button 
                onClick={handleSubmit}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              >
                Terminer
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};