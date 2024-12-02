import { motion } from "framer-motion";
import { Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

export const CampaignProgress = () => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    // Animation de la barre de progression
    const timer = setTimeout(() => {
      setProgress(70);
    }, 500);

    // Calcul du temps restant
    const endDate = new Date('2024-05-01');
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-primary/5 rounded-lg p-4 border border-primary/10"
    >
      <div className="flex items-center gap-2 mb-2">
        <Timer className="w-5 h-5 text-primary animate-pulse" />
        <p className="font-semibold text-primary">
          Il reste {timeLeft.days}j {timeLeft.hours}h {timeLeft.minutes}m
        </p>
      </div>
      <Progress value={progress} className="h-3 mb-2" />
      <p className="text-sm text-gray-600">
        {progress}% de l'objectif atteint !
      </p>
    </motion.div>
  );
};