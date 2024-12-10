import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const MotivationSection = ({ isMobile = false }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <div className="w-full md:hidden space-y-3 text-center mb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Offre de lancement</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 px-4">
            Gérez vos abonnements facilement
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 hidden md:block">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">
          Prenez le contrôle de vos abonnements
        </h1>
        <p className="text-lg text-gray-600">
          Rejoignez des milliers d'utilisateurs qui économisent déjà sur leurs abonnements.
        </p>
        <div className="space-y-4">
          <FeatureItem
            title="Visualisez vos dépenses"
            description="Obtenez une vue claire de tous vos abonnements"
          />
          <FeatureItem
            title="Économisez de l'argent"
            description="Identifiez les doublons et optimisez vos dépenses"
          />
          <FeatureItem
            title="Ne manquez aucun paiement"
            description="Recevez des rappels pour vos échéances"
          />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="flex items-center gap-3">
    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
      <Sparkles className="h-5 w-5 text-primary" />
    </div>
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  </div>
);