import { motion } from "framer-motion";
import { Check, BarChart3, Bell, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const MVPSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <Wallet className="h-5 w-5 text-primary" />,
      text: "Centraliser tous vos abonnements"
    },
    {
      icon: <BarChart3 className="h-5 w-5 text-primary" />,
      text: "Suivre vos dépenses mensuelles et annuelles"
    },
    {
      icon: <Bell className="h-5 w-5 text-primary" />,
      text: "Recevoir des recommandations personnalisées"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-neutral-50 border border-neutral-100 transition-shadow hover:shadow-md"
                >
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <p className="text-sm sm:text-base text-gray-700">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="w-full md:w-auto text-sm sm:text-base"
              >
                Commencez à gérer vos abonnements gratuitement
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative mt-8 md:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop"
                alt="Interface de l'application"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <p className="text-white text-base sm:text-xl font-medium p-4 sm:p-8">
                  Conçu pour la simplicité et l'efficacité
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section unifiée Stack & Outils */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-24 sm:mt-32"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 p-6 sm:p-12">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12 sm:space-y-16"
            >
              {/* Stack Technique */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div 
                  variants={itemVariants}
                  className="space-y-4 sm:space-y-6 text-center md:text-left"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Comparez, sélectionnez et créez une stack technique parfaitement adaptée à vos besoins
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="default"
                      size="lg"
                      onClick={() => navigate("/stack")}
                      className="group text-sm sm:text-base"
                    >
                      Créer ma stack
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="aspect-[16/9] p-2 sm:p-4">
                    <img
                      src="/lovable-uploads/f15ce945-db4a-495c-b980-3f2c3864a989.png"
                      alt="Stack technique personnalisée"
                      className="rounded-xl shadow-lg object-contain w-full h-full"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Séparateur */}
              <motion.div 
                variants={itemVariants}
                className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" 
              />

              {/* Outils 2025 */}
              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div 
                  variants={itemVariants}
                  className="order-2 md:order-1 relative"
                >
                  <div className="aspect-[16/9] p-2 sm:p-4">
                    <img
                      src="/lovable-uploads/a8bed031-f2ac-4896-9c0c-4cd34b719da5.png"
                      alt="Outils innovants 2025"
                      className="rounded-xl shadow-lg object-contain w-full h-full"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  variants={itemVariants}
                  className="order-1 md:order-2 space-y-4 sm:space-y-6 text-center md:text-left"
                >
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    Découvrez les outils innovants qui transformeront votre quotidien et boosteront votre business en 2025
                  </h2>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="default"
                      size="lg"
                      onClick={() => navigate("/tools")}
                      className="group text-sm sm:text-base"
                    >
                      Explorer les outils
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};