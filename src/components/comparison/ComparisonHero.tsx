import { motion } from "framer-motion";

export const ComparisonHero = () => {
  return (
    <div className="mb-12 text-center">
      <motion.h1 
        className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Trouvez l'Application Parfaite
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-600 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Comparez les fonctionnalités, les prix et les avis pour faire le meilleur choix 
        pour votre entreprise.
      </motion.p>
    </div>
  );
};