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

        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("👤 Index - Pas de session, redirection vers landing");
          await queryClient.clear();
          navigate("/landing", { replace: true });
          return;
        }

        // Si l'utilisateur est authentifié, le rediriger directement vers le dashboard
        console.log("✨ Index - Session trouvée, redirection vers dashboard");
        navigate("/dashboard", { replace: true });
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

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Index - Changement d'état d'authentification:", event);
      
      if (event === 'SIGNED_OUT') {
        console.log("👋 Index - Déconnexion détectée");
        await queryClient.clear();
        navigate("/landing", { replace: true });
      } else if (event === 'SIGNED_IN' && session) {
        console.log("🎉 Index - Connexion détectée");
        navigate("/dashboard", { replace: true });
      }
    });

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