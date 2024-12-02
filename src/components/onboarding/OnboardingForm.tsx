import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { FavoriteSubscriptionsSection } from "./sections/FavoriteSubscriptionsSection";
import { SpendingSection } from "./sections/SpendingSection";
import { PrioritiesSection } from "./sections/PrioritiesSection";
import { ManagementHabitsSection } from "./sections/ManagementHabitsSection";
import { RecommendationsSection } from "./sections/RecommendationsSection";
import { NotificationsSection } from "./sections/NotificationsSection";
import { motion } from "framer-motion";

export const OnboardingForm = () => {
  const [formData, setFormData] = useState({
    favorite_subscriptions: [] as string[],
    current_monthly_spend: "",
    target_monthly_budget: "",
    subscription_priorities: [] as string[],
    management_habits: "",
    wants_recommendations: true,
    notification_preferences: [] as string[],
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour continuer",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_preferences')
        .insert([
          {
            id: user.id,
            ...formData,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Profil complété !",
        description: "Nous avons personnalisé votre tableau de bord selon vos réponses.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de vos préférences",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="p-8 space-y-8 shadow-lg border-primary/10">
          <div className="space-y-2 text-center">
            <motion.h1 
              className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Personnalisez votre expérience
            </motion.h1>
            <motion.p 
              className="text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Répondez à ces questions pour un tableau de bord adapté à vos besoins
            </motion.p>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <FavoriteSubscriptionsSection
                value={formData.favorite_subscriptions}
                onChange={(value) => setFormData(prev => ({ ...prev, favorite_subscriptions: value }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <SpendingSection
                title="Votre estimation de dépenses mensuelles"
                value={formData.current_monthly_spend}
                onChange={(value) => setFormData(prev => ({ ...prev, current_monthly_spend: value }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <SpendingSection
                title="Votre budget mensuel cible"
                value={formData.target_monthly_budget}
                onChange={(value) => setFormData(prev => ({ ...prev, target_monthly_budget: value }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <PrioritiesSection
                value={formData.subscription_priorities}
                onChange={(value) => setFormData(prev => ({ ...prev, subscription_priorities: value }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <ManagementHabitsSection
                value={formData.management_habits}
                onChange={(value) => setFormData(prev => ({ ...prev, management_habits: value }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <RecommendationsSection
                value={formData.wants_recommendations}
                onChange={(value) => setFormData(prev => ({ ...prev, wants_recommendations: value }))}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <NotificationsSection
                value={formData.notification_preferences}
                onChange={(value) => setFormData(prev => ({ ...prev, notification_preferences: value }))}
              />
            </motion.div>

            <motion.div 
              className="flex justify-end pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <Button 
                onClick={handleSubmit} 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2 rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Terminer
              </Button>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};