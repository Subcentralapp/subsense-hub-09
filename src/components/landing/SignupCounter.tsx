import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CreditCard } from "lucide-react";

export const SignupCounter = () => {
  const [count, setCount] = useState<number>(735);
  const remainingSpots = 1000 - count;

  useEffect(() => {
    // Subscribe to realtime changes in the profiles table
    const channel = supabase
      .channel('public:profiles')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'profiles' 
      }, () => {
        setCount(prev => Math.min(prev + 1, 1000));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card rounded-xl p-4 text-center space-y-2"
      >
        <div className="text-sm text-gray-600 mb-2">Offre spéciale de lancement</div>
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(count / 1000) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-primary rounded-full h-1.5"
          />
        </div>
        <div className="text-xs text-primary font-medium">
          Gratuit à vie pour les {remainingSpots} prochains inscrits
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>Aucune carte bancaire requise : créez votre compte en quelques secondes et profitez automatiquement de l'offre gratuite pour les 1000 premiers inscrits !</span>
        </div>
      </motion.div>
    </div>
  );
};