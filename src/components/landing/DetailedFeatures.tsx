import { motion } from "framer-motion";
import { 
  BarChart3, 
  Bell, 
  Calendar, 
  CreditCard, 
  FileText, 
  PieChart,
  Settings,
  Sparkles,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const features = [
  {
    title: "Gestion Intelligente des Abonnements",
    description: "Centralisez et gérez tous vos abonnements en un seul endroit. Suivez vos dépenses, dates de renouvellement et recevez des notifications personnalisées.",
    icon: <Wallet className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    benefits: [
      "Vue d'ensemble claire de tous vos abonnements",
      "Notifications de renouvellement automatiques",
      "Suivi des périodes d'essai"
    ]
  },
  {
    title: "Analyse Financière Détaillée",
    description: "Visualisez et analysez vos dépenses avec des graphiques interactifs et des rapports détaillés pour prendre de meilleures décisions financières.",
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Graphiques interactifs de dépenses",
      "Rapports mensuels personnalisés",
      "Prévisions budgétaires"
    ]
  },
  {
    title: "Gestion des Factures",
    description: "Stockez et organisez toutes vos factures numériquement. Notre système analyse automatiquement vos documents pour en extraire les informations importantes.",
    icon: <FileText className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Stockage sécurisé des factures",
      "Extraction automatique des données",
      "Organisation intelligente"
    ]
  },
  {
    title: "Recommandations Personnalisées",
    description: "Recevez des suggestions d'optimisation basées sur vos habitudes de consommation et découvrez des alternatives plus avantageuses.",
    icon: <Sparkles className="w-10 h-10 text-primary" />,
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2940&auto=format&fit=crop",
    benefits: [
      "Suggestions d'optimisation personnalisées",
      "Comparaison des offres du marché",
      "Économies potentielles calculées"
    ]
  }
];

export const DetailedFeatures = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Fonctionnalités Détaillées
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Découvrez comment SubaCentral révolutionne la gestion de vos abonnements
            avec des outils puissants et intuitifs
          </motion.p>
        </div>

        <div className="space-y-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } items-center gap-12`}
            >
              <div className="lg:w-1/2 space-y-6">
                <div className="inline-block p-3 bg-primary/10 rounded-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <span className="h-2 w-2 bg-primary rounded-full" />
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
                <Button
                  size="lg"
                  onClick={() => navigate("/auth")}
                  className="mt-6"
                >
                  Essayer Gratuitement
                </Button>
              </div>
              <div className="lg:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl" />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="rounded-2xl shadow-2xl w-full object-cover aspect-video"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};