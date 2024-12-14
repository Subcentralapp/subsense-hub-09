import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/react-query";

export function UserNav() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSessionValid, setIsSessionValid] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        console.log("🔍 Vérification de la session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Erreur lors de la vérification de la session:", error);
          if (mounted) {
            setIsSessionValid(false);
            await handleSignOut();
          }
          return;
        }

        if (mounted) {
          const hasValidSession = !!session;
          console.log("✅ État de la session:", hasValidSession);
          setIsSessionValid(hasValidSession);
          
          if (!hasValidSession) {
            console.log("🚫 Pas de session valide, redirection vers /landing");
            await handleSignOut();
          }
        }
      } catch (error) {
        console.error("❌ Erreur inattendue lors de la vérification de la session:", error);
        if (mounted) {
          setIsSessionValid(false);
          await handleSignOut();
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 État de l'authentification changé:", event);
      
      if (mounted) {
        if (event === 'SIGNED_OUT' || !session) {
          console.log("👋 Utilisateur déconnecté, nettoyage et redirection...");
          setIsSessionValid(false);
          await clearAppCache();
          navigate("/landing", { replace: true });
        } else if (event === 'SIGNED_IN' && session) {
          console.log("🎉 Utilisateur connecté");
          setIsSessionValid(true);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const clearAppCache = async () => {
    console.log("🧹 Nettoyage du cache de l'application...");
    try {
      await queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();
      
      if ('caches' in window) {
        const cacheKeys = await caches.keys();
        await Promise.all(cacheKeys.map(key => caches.delete(key)));
      }
      
      console.log("✨ Cache nettoyé avec succès");
    } catch (error) {
      console.error("❌ Erreur lors du nettoyage du cache:", error);
    }
  };

  const handleSignOut = async () => {
    console.log("🔄 Tentative de déconnexion...");
    try {
      // Clear cache before sign out to prevent stale data
      await clearAppCache();
      
      // Attempt to sign out
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("❌ Erreur lors de la déconnexion:", error);
        // Even if there's an error, we want to clear the local session
        setIsSessionValid(false);
        navigate("/landing", { replace: true });
        return;
      }

      console.log("✅ Déconnexion réussie");
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });

    } catch (error) {
      console.error("❌ Erreur lors de la déconnexion:", error);
      // Force navigation to landing page even if sign out fails
      setIsSessionValid(false);
      navigate("/landing", { replace: true });
    }
  };

  if (!isSessionValid) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer bg-[#1a237e]">
          <AvatarFallback className="text-white bg-[#1a237e]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Mon compte</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/profile")}>
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut}>
          Déconnexion
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}