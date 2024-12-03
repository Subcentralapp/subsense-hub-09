import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const SupportMessage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const messages = [
    "Soutenez SubaCentral et devenez supporter pour accéder à des fonctionnalités exclusives !",
    "Offre limitée : Accès gratuit à vie pour les 1000 premiers inscrits ! 🚀"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-6">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="font-medium absolute inset-0"
        >
          {messages[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};