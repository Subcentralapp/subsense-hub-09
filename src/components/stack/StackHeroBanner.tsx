import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const StackHeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 py-6 px-4 rounded-lg mb-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto space-y-4"
      >
        <motion.h1 
          variants={item}
          className="text-2xl font-bold text-primary text-center"
        >
          Découvrez les outils qui comptent vraiment pour vous !
        </motion.h1>

        <motion.p 
          variants={item}
          className="text-sm text-gray-600 text-center max-w-2xl mx-auto"
        >
          Stop aux abonnements inutilisés. Créez votre stack technique personnalisée et maîtrisez vos outils numériques, que vous soyez professionnel ou particulier.
        </motion.p>

        <motion.div 
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4"
        >
          <motion.div variants={item} className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-700">
              Optimisez votre workflow avec des recommandations sur-mesure.
            </span>
          </motion.div>

          <motion.div variants={item} className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-700">
              Découvrez des applications innovantes adaptées à vos besoins.
            </span>
          </motion.div>

          <motion.div variants={item} className="flex items-start space-x-2">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <span className="text-sm text-gray-700">
              Gérez vos abonnements intelligemment et réduisez vos dépenses.
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};