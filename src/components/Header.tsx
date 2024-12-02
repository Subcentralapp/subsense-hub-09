import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn, Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const generateRandomLines = (count: number) => {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.2,
    width: 50 + Math.random() * 150,
  }));
};

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [randomLines] = useState(() => generateRandomLines(8));

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in Header:", event, session);
      setUser(session?.user ?? null);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          {randomLines.map((line, i) => (
            <motion.div
              key={i}
              className="absolute h-[2px] bg-primary/20"
              style={{
                width: `${line.width}px`,
                top: `${line.top}%`,
                left: `${line.left}%`,
                opacity: line.opacity,
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: line.opacity, x: 0 }}
              transition={{ 
                duration: 0.8,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/lovable-uploads/dd2572e4-8d74-4efc-bbd0-a2d9e911be06.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-primary"
          >
            <Heart className="w-5 h-5 text-primary animate-pulse" />
            <span className="font-medium">
              Soutenez SubaCentral et devenez supporter pour accéder à des fonctionnalités exclusives !
            </span>
          </motion.div>

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
                  <span className="text-primary">Connexion</span>
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
    </header>
  );
};