import { Button } from "@/components/ui/button";

interface OnboardingHeaderProps {
  onSkip: () => void;
}

export const OnboardingHeader = ({ onSkip }: OnboardingHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <Button 
        variant="ghost" 
        onClick={onSkip}
        className="text-black font-bold hover:text-gray-700"
      >
        Passer
      </Button>
      <Button 
        variant="ghost" 
        onClick={onSkip}
        className="text-gray-500 hover:text-gray-700"
      >
        Passer la question
      </Button>
    </div>
  );
};