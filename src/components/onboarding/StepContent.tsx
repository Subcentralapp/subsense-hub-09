import { motion } from "framer-motion";
import { OnboardingFormData } from "@/types/onboarding";

interface StepContentProps {
  currentStep: number;
  direction: number;
  StepComponent: React.ComponentType<any>;
  formData: OnboardingFormData;
  stepKey: string;
  onChange: (value: any) => void;
}

export const StepContent = ({ 
  currentStep, 
  direction, 
  StepComponent,
  formData,
  stepKey,
  onChange 
}: StepContentProps) => {
  return (
    <motion.div
      key={currentStep}
      custom={direction}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      className="relative"
    >
      <StepComponent
        value={formData[stepKey as keyof OnboardingFormData]}
        onChange={onChange}
      />
    </motion.div>
  );
};