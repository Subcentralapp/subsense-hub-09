import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BackgroundLines } from "./header/BackgroundLines";
import { Logo } from "./header/Logo";
import { SupportMessage } from "./header/SupportMessage";
import { useNavigate } from "react-router-dom";
import { UserNav } from "./UserNav";
import { PromoMessage } from "./header/PromoMessage";
import { MobileMenu } from "./header/MobileMenu";
import { AuthButtons } from "./header/AuthButtons";

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session on mount
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Erreur lors de la vérification de la session:", error);
          setUser(null);
          return;
        }
        console.log("Session actuelle:", session);
        setUser(session?.user || null);
      } catch (error) {
        console.error("Erreur lors de la vérification de la session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session?.user);
        setUser(session?.user);
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        setUser(null);
        navigate("/landing", { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (isLoading) {
    return null; // ou un composant de chargement
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <BackgroundLines />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex justify-between items-center h-16">
            {/* Mobile Layout */}
            <div className="flex items-center gap-4 sm:hidden">
              {user ? <UserNav /> : <AuthButtons user={user} />}
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
            {user ? <UserNav /> : <AuthButtons user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
};