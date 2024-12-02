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
        src="/lovable-uploads/dd2572e4-8d74-4efc-bbd0-a2d9e911be06.png"
        alt="Logo"
        className="h-16 w-auto object-contain"
      />
    </motion.div>
  );
};