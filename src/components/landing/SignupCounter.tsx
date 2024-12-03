import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
        className="bg-white/80 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-6 text-center"
      >
        <div className="mb-4">
          <div className="text-4xl font-bold text-primary mb-2">{count}</div>
          <div className="text-sm text-gray-600">inscrits sur 1000</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(count / 1000) * 100}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-primary rounded-full h-2"
          />
        </div>
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm font-semibold text-red-500"
        >
          Plus que {remainingSpots} places gratuites !
        </motion.div>
      </motion.div>
    </div>
  );
};