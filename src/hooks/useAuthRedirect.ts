import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const checkUserPreferences = async (userId: string, email_confirmed_at: string | null) => {
    console.log("Vérification du statut de l'email et des préférences utilisateur...");
    
    // Vérifier si l'email est confirmé
    if (!email_confirmed_at) {
      console.log("Email non confirmé, redirection vers la page d'attente");
      toast({
        title: "Vérification d'email requise",
        description: "Veuillez vérifier votre email avant de continuer. Vérifiez votre boîte de réception.",
        variant: "destructive",
      });
      navigate("/auth", { replace: true });
      return;
    }

    console.log("Email confirmé, vérification des préférences...");
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('*')
      .eq('id', userId)
      .single();

    if (!preferences) {
      console.log("Pas de préférences trouvées, redirection vers onboarding");
      navigate("/onboarding", { replace: true });
    } else {
      console.log("Préférences trouvées, redirection vers le tableau de bord");
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await checkUserPreferences(session.user.id, session.user.email_confirmed_at);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du statut d'authentification:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la vérification de votre compte.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Changement d'état d'authentification:", event, session);
      if (event === 'SIGNED_IN' && session) {
        await checkUserPreferences(session.user.id, session.user.email_confirmed_at);
      } else if (event === 'USER_UPDATED' && session) {
        // Si l'email vient d'être confirmé
        await checkUserPreferences(session.user.id, session.user.email_confirmed_at);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { isLoading };
};