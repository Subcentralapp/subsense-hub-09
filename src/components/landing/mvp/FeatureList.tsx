import { motion } from "framer-motion";
import { BarChart3, Bell, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export const FeatureList = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="space-y-6 sm:space-y-8"
    >
      <div className="space-y-4 sm:space-y-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 p-3 sm:p-4 rounded-lg bg-neutral-50 border border-neutral-100 transition-shadow hover:shadow-md"
          >
            <div className="flex-shrink-0">
              {feature.icon}
            </div>
            <p className="text-sm sm:text-base text-gray-700">{feature.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="w-full md:w-auto text-sm sm:text-base"
        >
          Commencez à gérer vos abonnements gratuitement
        </Button>
      </motion.div>
    </motion.div>
  );
};