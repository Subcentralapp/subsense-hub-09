import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

export const ToolsSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
      <motion.div 
        variants={itemVariants}
        className="order-2 md:order-1 relative"
      >
        <div className="aspect-[16/9] p-2 sm:p-4">
          <img
            src="/lovable-uploads/a8bed031-f2ac-4896-9c0c-4cd34b719da5.png"
            alt="Outils innovants 2025"
            className="rounded-xl shadow-lg object-contain w-full h-full"
          />
        </div>
      </motion.div>
      <motion.div 
        variants={itemVariants}
        className="order-1 md:order-2 space-y-4 sm:space-y-6 text-center md:text-left"
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Découvrez les outils innovants qui transformeront votre quotidien et boosteront votre business en 2025
        </h2>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="default"
            size="lg"
            onClick={() => navigate("/tools")}
            className="group text-sm sm:text-base"
          >
            Explorer les outils
            <motion.span
              className="inline-block ml-2"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};