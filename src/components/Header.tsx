import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundLines } from "./header/BackgroundLines";
import { Logo } from "./header/Logo";
import { SupportMessage } from "./header/SupportMessage";
import { AuthButtons } from "./header/AuthButtons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session?.user);
        setUser(session?.user);
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const navigationItems = [
    { label: "Tableau de bord", path: "/dashboard" },
    { label: "Paiements", path: "/dashboard?tab=payments" },
    { label: "Comparer", path: "/dashboard?tab=compare" },
    { label: "Applications", path: "/dashboard?tab=apps" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <BackgroundLines />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-neutral hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <SupportMessage />
            <AuthButtons user={user} />
          </div>
        </div>
      </div>
    </header>
  );
};