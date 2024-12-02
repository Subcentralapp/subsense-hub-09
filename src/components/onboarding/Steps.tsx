interface StepsProps {
  currentStep: number;
  totalSteps: number;
}

export const Steps = ({ currentStep, totalSteps }: StepsProps) => {
  const steps = [
    "Vos abonnements préférés",
    "Dépenses mensuelles",
    "Budget cible",
    "Priorités",
    "Habitudes de gestion",
    "Recommandations",
    "Notifications",
  ];

  return (
    <div className="text-sm text-center text-muted-foreground">
      Étape {currentStep + 1} sur {totalSteps}: {steps[currentStep]}
    </div>
  );
};