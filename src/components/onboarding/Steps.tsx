import { motion } from "framer-motion";

interface StepsProps {
  currentStep: number;
  totalSteps: number;
}

export const Steps = ({ currentStep, totalSteps }: StepsProps) => {
  const steps = [
    "Vos abonnements",
    "Budget actuel",
    "Budget cible",
    "Priorités",
    "Freins",
    "Profil",
    "Outils",
    "Nouveaux services",
    "Utilisation",
  ];

  return (
    <div className="w-full py-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-primary">
          Étape {currentStep + 1} sur {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {steps[currentStep]}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
};