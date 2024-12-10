import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const checkUserPreferences = async (userId: string) => {
    console.log("Vérification des préférences utilisateur...");
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
          await checkUserPreferences(session.user.id);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du statut d'authentification:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Changement d'état d'authentification:", event, session);
      if (event === 'SIGNED_IN' && session) {
        await checkUserPreferences(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { isLoading };
};