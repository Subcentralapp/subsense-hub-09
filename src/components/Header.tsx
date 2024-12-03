import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundLines } from "./header/BackgroundLines";
import { Logo } from "./header/Logo";
import { SupportMessage } from "./header/SupportMessage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserNav } from "./UserNav";
import { PromoMessage } from "./header/PromoMessage";
import { MobileMenu } from "./header/MobileMenu";

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

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <BackgroundLines />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Layout */}
            <div className="flex items-center gap-4 sm:hidden">
              <UserNav />
            </div>
            
            {/* Logo - Centered on mobile */}
            <div className="absolute left-1/2 transform -translate-x-1/2 sm:relative sm:left-0 sm:transform-none">
              <Logo />
            </div>

            {/* Menu Hamburger - Right side on mobile */}
            <div className="flex items-center gap-4 sm:hidden">
              <MobileMenu />
            </div>
          </div>
          
          {/* Message promotionnel - Mobile & Desktop */}
          <PromoMessage isMobile={true} />
          <PromoMessage />

          {/* Navigation - Desktop */}
          <div className="hidden sm:flex items-center space-x-4">
            <SupportMessage />
            {user ? (
              <UserNav />
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/auth")}
                className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 rounded-md"
              >
                Connexion
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};