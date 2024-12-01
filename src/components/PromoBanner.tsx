import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const promoMessages = [
  "Simplifiez la gestion de vos abonnements dès aujourd'hui ! 🚀",
  "Économisez jusqu'à 30% sur vos dépenses mensuelles avec SubaCentral ✨"
];

export const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-primary py-2 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-sm font-medium"
          >
            {promoMessages[currentIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};