import { ArrowRight, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:30px_30px] [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 relative z-10">
        <div className="text-center lg:text-left lg:flex lg:items-center lg:gap-12">
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-tight">
                Gérez vos abonnements en toute simplicité
              </h1>
              
              <p className="text-xl text-muted-foreground">
                Centralisez, optimisez et économisez sur tous vos abonnements.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
                <Gift className="w-5 h-5" />
                <span className="text-sm font-medium">
                  Offre spéciale : Gratuit à vie pour les 1000 premiers inscrits
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 group"
              >
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => {
                  const supportSection = document.getElementById('support-section');
                  supportSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-lg px-8 py-6 border-2 hover:bg-primary/5"
              >
                Devenir Early Supporter
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/2 mt-12 lg:mt-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  <img
                    src="/lovable-uploads/56ae0633-4189-4130-8f2c-64c4c5fe4459.png"
                    alt="Dashboard Preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
    </div>
  );
};