import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Target, Zap } from "lucide-react";
import { ApplicationExplorer } from "@/components/applications/ApplicationExplorer";
import { TrendingApps } from "@/components/applications/TrendingApps";

const Applications = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 mb-12"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Découvrez Votre Stack Technique Idéale
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Trouvez les meilleures applications pour votre activité en quelques clics
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 hover:shadow-lg transition-all hover:border-primary/20 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Stack Personnalisée</h3>
          </div>
          <p className="text-sm text-gray-600">
            Créez votre stack technique sur mesure en fonction de vos besoins
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all hover:border-primary/20 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Rocket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Apps Tendances</h3>
          </div>
          <p className="text-sm text-gray-600">
            Découvrez les applications les plus populaires du moment
          </p>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-all hover:border-primary/20 cursor-pointer">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Optimisation</h3>
          </div>
          <p className="text-sm text-gray-600">
            Analysez et optimisez votre stack technique actuelle
          </p>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-12">
        <TrendingApps />
        <ApplicationExplorer />
      </div>
    </div>
  );
};

export default Applications;