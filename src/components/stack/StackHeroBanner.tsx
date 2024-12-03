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
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-6 px-4 rounded-xl mb-8 border border-gray-800">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-4xl mx-auto space-y-4"
      >
        <motion.div 
          variants={item}
          className="flex items-center justify-center gap-2 mb-2"
        >
          <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Découvrez les outils qui comptent vraiment pour vous !
          </h1>
          <Sparkles className="h-5 w-5 text-purple-400 animate-pulse" />
        </motion.div>

        <motion.p 
          variants={item}
          className="text-sm md:text-base text-white font-semibold text-center max-w-2xl mx-auto leading-relaxed"
        >
          Créez votre stack technique personnalisée, découvrez des outils adaptés à vos besoins, et simplifiez votre gestion d'abonnements !
        </motion.p>

        <motion.div 
          variants={container}
          className="grid grid-cols-3 gap-3 mt-4"
        >
          <motion.div 
            variants={item} 
            className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-100">
              <span className="text-lg">🎯</span>
              <p className="text-xs">
                Optimisez votre workflow
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-100">
              <span className="text-lg">💡</span>
              <p className="text-xs">
                Trouvez les bons outils
              </p>
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center gap-2 text-gray-100">
              <span className="text-lg">💳</span>
              <p className="text-xs">
                Réduisez vos dépenses
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};