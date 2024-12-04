import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="flex-shrink-0 cursor-pointer" 
      onClick={() => navigate("/")}
      whileHover={{ scale: 1.05 }}
    >
      <img
        src="/lovable-uploads/06ead9b8-29da-49f3-8b3c-32233b7fa21c.png"
        alt="Subcentral Logo"
        className="h-8 w-auto object-contain sm:h-12 md:h-14"
      />
    </motion.div>
  );
};