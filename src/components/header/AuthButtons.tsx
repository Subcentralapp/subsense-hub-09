import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AuthButtonsProps {
  user: any;
}

export const AuthButtons = ({ user }: AuthButtonsProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-4">
      {user ? (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
          >
            Tableau de bord
          </Button>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="outline"
            className="flex items-center space-x-2 border-primary/20 hover:border-primary/40 transition-colors"
            onClick={() => navigate("/auth")}
          >
            <LogIn className="h-4 w-4 text-primary" />
            <span className="text-primary hidden md:inline">Connexion</span>
          </Button>
        </motion.div>
      )}
    </div>
  );
};