import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { queryClient } from "@/lib/react-query";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Index - Vérification de la session...");
        setIsLoading(true);

        // Récupérer la session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Index - Erreur lors de la vérification de la session:", error);
          throw error;
        }

        if (!session) {
          console.log("👤 Index - Pas de session, redirection vers landing");
          // Nettoyer le cache avant la redirection
          await queryClient.clear();
          navigate("/landing", { replace: true });
          return;
        }

        console.log("✅ Index - Session trouvée, vérification des préférences...");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("❌ Index - Erreur lors de la vérification des préférences:", preferencesError);
          throw preferencesError;
        }

        if (!preferences) {
          console.log("🆕 Index - Pas de préférences, redirection vers onboarding");
          navigate("/onboarding", { replace: true });
        } else {
          console.log("✨ Index - Préférences trouvées, redirection vers dashboard");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("❌ Index - Erreur inattendue:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la vérification de votre session.",
          variant: "destructive",
        });
        navigate("/landing", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    // Configurer l'écouteur de changement d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Index - Changement d'état d'authentification:", event);
      
      if (event === 'SIGNED_OUT') {
        console.log("👋 Index - Déconnexion détectée");
        await queryClient.clear();
        navigate("/landing", { replace: true });
      } else if (event === 'SIGNED_IN' && session) {
        console.log("🎉 Index - Connexion détectée");
        checkAuth();
      }
    });

    // Vérifier l'authentification au montage
    checkAuth();

    // Nettoyer l'écouteur
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
};

export default Index;