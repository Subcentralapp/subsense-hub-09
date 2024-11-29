import { Header } from "@/components/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const benefits = [
  "Économisez jusqu'à 30% sur vos abonnements",
  "Visualisez toutes vos dépenses en un coup d'œil",
  "Recevez des alertes avant chaque renouvellement",
  "Découvrez des alternatives moins chères"
];

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("User already authenticated, redirecting to dashboard");
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      {/* Premium Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Passez à la Version Premium
              </h2>
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span className="text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button 
                size="lg"
                onClick={() => navigate("/auth")}
                className="w-full md:w-auto"
              >
                Essayer Premium Gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white">
                <div className="absolute -top-4 -right-4 bg-primary px-4 py-2 rounded-full text-sm font-semibold">
                  Populaire
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">9,99€</span>
                  <span className="text-white/80">/mois</span>
                </div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Toutes les fonctionnalités de base</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Recommandations avancées</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Support prioritaire</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 mr-2" />
                    <span>Analyses détaillées</span>
                  </li>
                </ul>
                <Button 
                  variant="secondary"
                  size="lg"
                  className="w-full bg-white text-primary hover:bg-white/90"
                  onClick={() => navigate("/auth")}
                >
                  Commencer l'essai gratuit
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Prêt à Optimiser vos Abonnements ?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'utilisateurs qui font déjà des économies chaque mois.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/auth")}
            className="text-lg px-8 py-6"
          >
            Commencer Maintenant
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;