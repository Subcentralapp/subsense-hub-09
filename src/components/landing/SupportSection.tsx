import { motion } from "framer-motion";
import { Crown, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const SupportSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-white to-primary/5" id="support-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Votre soutien compte
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SubaCentral est et restera gratuit pour ses fonctionnalités essentielles. Votre soutien nous permet d'aller plus loin et d'innover continuellement.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8 md:p-12 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-600 mb-8">
                <span className="font-semibold text-primary">Toutes les fonctionnalités essentielles sont gratuites</span> - gérez vos abonnements, suivez vos dépenses, et gardez le contrôle de votre budget sans frais. En devenant supporter, vous nous aidez à développer des fonctionnalités avancées tout en profitant d'avantages exclusifs.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  <span>Fonctionnalités essentielles gratuites</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" />
                  <span>Avantages exclusifs supporters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>Communauté grandissante</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => navigate("/auth")}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg"
              >
                Rejoignez l'aventure
              </Button>
              <p className="text-sm text-gray-500 mt-4">
                Votre soutien fait la différence
              </p>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        </motion.div>
      </div>
    </section>
  );
};