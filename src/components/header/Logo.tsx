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
        src="/lovable-uploads/185452d2-c98b-4305-83ca-7c36895e5a80.png"
        alt="Subcentral Logo"
        className="h-10 w-auto object-contain sm:h-16 md:h-20"
      />
    </motion.div>
  );
};