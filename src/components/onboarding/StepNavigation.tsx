import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const StepNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
}: StepNavigationProps) => {
  return (
    <div className="flex justify-between mt-6">
      <Button
        onClick={onPrevious}
        variant="outline"
        disabled={currentStep === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Précédent
      </Button>

      {currentStep === totalSteps - 1 ? (
        <Button 
          onClick={onSubmit}
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2"
        >
          Terminer
        </Button>
      ) : (
        <Button 
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200 hover:shadow-lg flex items-center gap-2"
        >
          Suivant
          <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};