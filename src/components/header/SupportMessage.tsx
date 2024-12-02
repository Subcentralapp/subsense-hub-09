import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const SupportMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-2 text-primary"
    >
      <Heart className="w-5 h-5 text-primary animate-pulse" />
      <span className="font-medium">
        Soutenez SubaCentral et devenez supporter pour accéder à des fonctionnalités exclusives !
      </span>
    </motion.div>
  );
};