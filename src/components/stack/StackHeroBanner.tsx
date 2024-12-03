import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 rounded-xl mb-8 border border-gray-800">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl mx-auto space-y-6"
      >
        <motion.div 
          variants={item}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Découvrez les outils qui comptent vraiment pour vous !
          </h1>
          <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
        </motion.div>

        <motion.p 
          variants={item}
          className="text-base text-gray-300 text-center max-w-2xl mx-auto leading-relaxed"
        >
          Stop aux abonnements inutilisés. Créez votre stack technique personnalisée et 
          maîtrisez vos outils numériques, que vous soyez professionnel ou particulier.
        </motion.p>

        <motion.div 
          variants={container}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
        >
          <motion.div 
            variants={item} 
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 text-gray-200">
              <span className="text-2xl">🎯</span>
              <p className="text-sm">
                Optimisez votre workflow avec des recommandations sur-mesure
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 text-gray-200">
              <span className="text-2xl">💡</span>
              <p className="text-sm">
                Découvrez des applications innovantes adaptées à vos besoins
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 text-gray-200">
              <span className="text-2xl">💳</span>
              <p className="text-sm">
                Gérez vos abonnements intelligemment et réduisez vos dépenses
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};