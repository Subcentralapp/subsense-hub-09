import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { checkRateLimit } from "@/lib/rateLimiter";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const checkUserPreferences = async (userId: string, email_confirmed_at: string | null) => {
    try {
      await checkRateLimit('auth');
      console.log("🔍 Vérification du statut de l'email et des préférences utilisateur...");
      
      // Vérifier si l'email est confirmé
      if (!email_confirmed_at) {
        console.log("❌ Email non confirmé, redirection vers la page d'attente");
        toast({
          title: "Vérification d'email requise",
          description: "Veuillez vérifier votre email avant de continuer. Vérifiez votre boîte de réception.",
          variant: "destructive",
        });
        navigate("/auth", { replace: true });
        return;
      }

      console.log("✅ Email confirmé, vérification des préférences...");
      const { data: preferences, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error("❌ Erreur lors de la vérification des préférences:", error);
        throw error;
      }

      // Si l'utilisateur n'a pas de préférences ET que c'est sa première connexion
      const { data: loginHistory } = await supabase
        .from('profiles')
        .select('login_history')
        .eq('id', userId)
        .single();
      
      const isFirstLogin = !loginHistory?.login_history || loginHistory.login_history.length <= 1;

      if (!preferences && isFirstLogin) {
        console.log("🆕 Première connexion détectée, redirection vers onboarding");
        navigate("/onboarding", { replace: true });
        return;
      }

      // Dans tous les autres cas, redirection vers le dashboard
      console.log("👉 Redirection vers le tableau de bord");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("❌ Erreur lors de la vérification:", error);
      if (error.message?.includes('Too many requests')) {
        toast({
          title: "Trop de tentatives",
          description: "Veuillez patienter quelques minutes avant de réessayer.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la vérification.",
          variant: "destructive",
        });
      }
      // En cas d'erreur, rediriger vers le dashboard par défaut
      navigate("/dashboard", { replace: true });
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          await checkUserPreferences(session.user.id, session.user.email_confirmed_at);
        } else {
          console.log("👋 Pas de session active, redirection vers landing");
          navigate("/landing", { replace: true });
        }
      } catch (error) {
        console.error("❌ Erreur lors de la vérification du statut d'authentification:", error);
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
      console.log("🔄 Changement d'état d'authentification:", event, session);
      if (event === 'SIGNED_IN' && session) {
        await checkUserPreferences(session.user.id, session.user.email_confirmed_at);
      } else if (event === 'SIGNED_OUT') {
        navigate("/landing", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { isLoading };
};