import { useState } from "react";
import { OnboardingFormData } from "@/types/onboarding";
import { FavoriteSubscriptionsSection } from "../sections/FavoriteSubscriptionsSection";
import { SpendingSection } from "../sections/SpendingSection";
import { PrioritiesSection } from "../sections/PrioritiesSection";
import { BarriersSection } from "../sections/BarriersSection";
import { DemographicsSection } from "../sections/DemographicsSection";
import { ManagementToolsSection } from "../sections/ManagementToolsSection";
import { NewServicesSection } from "../sections/NewServicesSection";

export const useOnboardingSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

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

  return {
    currentStep,
    direction,
    steps,
    handleNext,
    handlePrevious,
    totalSteps: steps.length
  };
};