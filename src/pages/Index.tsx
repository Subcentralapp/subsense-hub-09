import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("👤 Pas de session, redirection vers landing");
          navigate("/landing", { replace: true });
          return;
        }

        console.log("✅ Session trouvée, vérification des préférences...");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!preferences) {
          console.log("🆕 Pas de préférences, redirection vers onboarding");
          navigate("/onboarding", { replace: true });
        } else {
          console.log("✨ Préférences trouvées, redirection vers dashboard");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("❌ Erreur lors de la vérification:", error);
        navigate("/landing", { replace: true });
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

export default Index;