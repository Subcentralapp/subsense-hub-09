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

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Votre gestion des abonnements simplifiée, gratuite et accessible !
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Avec notre application, vous pouvez dès aujourd'hui :
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-100"
                >
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <p className="text-gray-700">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="w-full md:w-auto"
            >
              Commencez à gérer vos abonnements gratuitement
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop"
                alt="Interface de l'application"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <p className="text-white text-xl font-medium p-8">
                  Conçu pour la simplicité et l'efficacité
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};