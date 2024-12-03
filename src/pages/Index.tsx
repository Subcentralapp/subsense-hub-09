import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Checking authentication status...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("👤 No user found, redirecting to landing page");
        navigate("/landing");
        return;
      }

      // Vérifier si l'utilisateur a déjà complété l'onboarding
      const { data: preferences, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("❌ Error checking user preferences:", error);
      }

      // Si l'utilisateur vient de s'inscrire et n'a pas de préférences
      if (!preferences) {
        console.log("🆕 New user detected, redirecting to onboarding");
        navigate("/onboarding");
      } else {
        console.log("✅ User has completed onboarding, redirecting to dashboard");
        navigate("/dashboard");
      }
    };

    checkAuth();
  }, [navigate]);

  return null;
};

export default Index;