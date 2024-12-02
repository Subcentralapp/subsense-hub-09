import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      // Vérifier si l'utilisateur a complété l'onboarding
      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!preferences) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    };

    checkAuth();
  }, [navigate]);

  return null; // Cette page est juste un redirecteur
};

export default Index;