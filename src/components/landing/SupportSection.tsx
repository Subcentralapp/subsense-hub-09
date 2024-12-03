import { motion } from "framer-motion";
import { Crown, Star, Users, Heart, Shield, Rocket } from "lucide-react";
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
          <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            <Heart className="w-4 h-4 mr-2 animate-pulse" />
            Soutenez l'innovation
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ensemble, créons l'avenir de la gestion d'abonnements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            En devenant supporter, vous contribuez directement au développement de nouvelles fonctionnalités et à l'amélioration continue de SubaCentral.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 mix-blend-multiply" />
          </div>
          
          <div className="relative p-8 md:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Shield className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Accès anticipé</h3>
                      <p className="text-gray-600">Testez les nouvelles fonctionnalités en avant-première et participez à leur évolution.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Rocket className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Support prioritaire</h3>
                      <p className="text-gray-600">Bénéficiez d'une assistance dédiée et de réponses rapides à vos questions.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => navigate("/auth")}
                      className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Crown className="w-5 h-5 mr-2" />
                      Devenir Supporter
                    </Button>
                  </motion.div>
                  <p className="text-sm text-gray-500">
                    Rejoignez notre communauté de supporters passionnés
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Communauté grandissante</h3>
            <p className="text-gray-600">Rejoignez des milliers d'utilisateurs qui nous font confiance</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Star className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fonctionnalités exclusives</h3>
            <p className="text-gray-600">Accédez à des outils avancés réservés aux supporters</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Crown className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Badge Supporter</h3>
            <p className="text-gray-600">Affichez fièrement votre soutien avec un badge exclusif</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};