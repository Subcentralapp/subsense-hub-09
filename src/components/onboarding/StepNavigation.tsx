import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

export const StepNavigation = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext,
  isSubmitting 
}: StepNavigationProps) => {
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 0 || isSubmitting}
      >
        Précédent
      </Button>
      <Button 
        onClick={onNext}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enregistrement...
          </>
        ) : (
          isLastStep ? "Terminer" : "Suivant"
        )}
      </Button>
    </div>
  );
};