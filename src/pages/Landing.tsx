import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, BarChart, Clock, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// ... keep existing code (features and benefits arrays)

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("User already authenticated, redirecting to dashboard");
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  const handleGetStarted = () => {
    navigate("/auth");
  };

  const features = [
    {
      icon: <BarChart className="w-6 h-6 text-primary" />,
      title: "Suivi Intelligent",
      description: "Visualisez et analysez vos dépenses d'abonnements en temps réel"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Rappels Automatiques",
      description: "Ne manquez plus jamais une date de renouvellement"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Recommandations Personnalisées",
      description: "Découvrez des opportunités d'économies adaptées à votre profil"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Sécurité Maximale",
      description: "Vos données sont cryptées et sécurisées"
    }
  ];

  const benefits = [
    "Économisez jusqu'à 30% sur vos abonnements",
    "Interface intuitive et facile à utiliser",
    "Support client réactif",
    "Mises à jour régulières",
    "Importation automatique des factures",
    "Tableau de bord personnalisable"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
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
                onClick={handleGetStarted}
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

      {/* Features Section */}
      <div id="features" className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Fonctionnalités Principales
            </h2>
            <p className="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour une gestion efficace de vos abonnements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

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
