import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const HeroTitle = () => {
  return (
    <div className="text-center mb-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6"
      >
        Votre gestion des abonnements simplifiée, gratuite et accessible !
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4"
      >
        Avec notre application, vous pouvez dès aujourd'hui :
      </motion.p>
    </div>
  );
};