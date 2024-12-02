interface StepsProps {
  currentStep: number;
  totalSteps: number;
}

export const Steps = ({ currentStep, totalSteps }: StepsProps) => {
  const steps = [
    "Vos abonnements",
    "Budget mensuel",
    "Personnalisation",
  ];

  return (
    <div className="text-sm text-center text-muted-foreground">
      Étape {currentStep + 1} sur {totalSteps}: {steps[currentStep]}
    </div>
  );
};