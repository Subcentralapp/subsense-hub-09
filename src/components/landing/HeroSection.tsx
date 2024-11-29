import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#1A1F2C] text-white">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-0" />
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-8"
          >
            VOTRE LIBERTÉ
            <br />
            FINANCIÈRE
            <br />
            <span className="text-primary">COMMENCE ICI</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Prenez le contrôle de vos abonnements et optimisez vos dépenses 
            avec notre plateforme intelligente de gestion financière.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
            >
              Commencer Maintenant
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6 border-white/20 hover:bg-white/10"
            >
              Découvrir les Fonctionnalités
            </Button>
          </motion.div>
        </div>

        {/* Cards Visual */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          <div className="relative w-full aspect-[16/9] bg-gradient-to-br from-[#2A2F3C] to-[#1A1F2C] rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 transform -rotate-12 scale-110">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-48 h-72 bg-gradient-to-br from-primary/80 to-secondary/80 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
    </div>
  );
};