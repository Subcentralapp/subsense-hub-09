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
import { useToast } from "@/hooks/use-toast";

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        console.log("🔍 Vérification de la session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Erreur lors de la vérification de la session:", error);
          // Si l'erreur est liée au refresh token, on déconnecte l'utilisateur
          if (error.message?.includes('refresh_token_not_found')) {
            console.log("🔄 Refresh token invalide, déconnexion...");
            await handleSignOut();
            return;
          }
          setUser(null);
          return;
        }

        console.log("✅ Session actuelle:", session);
        setUser(session?.user || null);
      } catch (error) {
        console.error("❌ Erreur inattendue lors de la vérification de la session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 État de l'authentification changé:", event);
      
      if (event === "SIGNED_IN") {
        console.log("✅ Utilisateur connecté:", session?.user);
        setUser(session?.user);
      } else if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
        if (!session) {
          console.log("👋 Utilisateur déconnecté ou token invalide");
          setUser(null);
          navigate("/landing", { replace: true });
          toast({
            title: "Session expirée",
            description: "Veuillez vous reconnecter",
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      console.log("🧹 Nettoyage des souscriptions");
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      console.log("🔄 Déconnexion...");
      await supabase.auth.signOut();
      setUser(null);
      navigate("/landing", { replace: true });
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès",
      });
    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <BackgroundLines />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center h-14 sm:h-16">
          {/* Mobile Layout */}
          <div className="flex items-center gap-4 sm:hidden">
            <MobileMenu />
          </div>
          
          {/* Logo - Centered on mobile, left on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 sm:relative sm:left-0 sm:transform-none sm:mr-4">
            <Logo />
          </div>

          {/* User Nav - Right side on mobile */}
          <div className="flex items-center gap-4 sm:hidden ml-auto">
            {user ? <UserNav /> : <AuthButtons user={user} />}
          </div>
          
          {/* Message promotionnel - Desktop only */}
          <div className="hidden sm:block flex-1">
            <PromoMessage />
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden sm:flex items-center space-x-4">
            <SupportMessage />
            {user ? <UserNav /> : <AuthButtons user={user} />}
          </div>
        </div>
        
        {/* Message promotionnel - Mobile only */}
        <div className="sm:hidden">
          <PromoMessage isMobile={true} />
        </div>
      </div>
    </header>
  );
};