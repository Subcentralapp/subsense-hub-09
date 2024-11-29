import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Gérez Tous Vos Abonnements
            <br />
            <span className="text-primary">En Un Seul Endroit</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          >
            Simplifiez votre vie numérique et économisez de l'argent en centralisant tous vos abonnements sur une seule plateforme intelligente.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Button 
              size="lg" 
              onClick={() => navigate("/auth")}
              className="text-lg px-8 py-6"
            >
              Commencer Gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                const demoSection = document.getElementById('features');
                demoSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-lg px-8 py-6"
            >
              Découvrir les Fonctionnalités
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};