import { motion } from "framer-motion";

interface StepHeaderProps {
  title: string;
  description: string;
}

export const StepHeader = ({ title, description }: StepHeaderProps) => {
  return (
    <div className="space-y-2 text-center mb-4">
      <motion.h1 
        className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h1>
      <motion.p 
        className="text-sm text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
    </div>
  );
};