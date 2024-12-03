import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundLines } from "./header/BackgroundLines";
import { Logo } from "./header/Logo";
import { SupportMessage } from "./header/SupportMessage";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserNav } from "./UserNav";
import { Timer, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

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
            <Logo />
            <div className="flex items-center gap-4 sm:hidden">
              {user ? (
                <UserNav />
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/auth")}
                  className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2 rounded-md"
                >
                  Connexion
                </motion.button>
              )}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2">
                    <Menu className="h-6 w-6" />
                  </button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="flex flex-col gap-4 mt-8">
                    <a href="/dashboard" className="text-lg font-medium">Dashboard</a>
                    <a href="/profile" className="text-lg font-medium">Profil</a>
                    <SupportMessage />
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {/* Message promotionnel - Mobile */}
          <div className="sm:hidden w-full overflow-hidden py-2">
            <div className="animate-marquee whitespace-nowrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-600">
                <Timer className="w-4 h-4 animate-pulse" />
                <span className="text-xs font-medium">
                  Accès gratuit à vie pour les 1000 premiers inscrits ! 🚀
                </span>
              </div>
            </div>
          </div>

          {/* Message promotionnel - Desktop */}
          <div className="hidden sm:flex flex-1 justify-center px-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600">
              <Timer className="w-4 h-4 animate-pulse" />
              <span className="text-sm font-medium">
                Offre limitée : Accès gratuit à vie pour les 1000 premiers inscrits ! 🚀
              </span>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden sm:flex items-center space-x-4">
            <SupportMessage />
            {user ? <UserNav /> : (
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