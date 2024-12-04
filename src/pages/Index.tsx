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

      console.log("✅ User found, checking preferences...");
      try {
        const { data: preferences, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', user.id);

        if (error) {
          console.error("❌ Error checking user preferences:", error);
          navigate("/landing");
          return;
        }

        if (!preferences || preferences.length === 0) {
          console.log("🆕 No preferences found, redirecting to onboarding");
          navigate("/onboarding");
        } else {
          console.log("✅ Preferences found, redirecting to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("❌ Error in checkAuth:", error);
        navigate("/landing");
      }
    };

    checkAuth();
  }, [navigate]);

  return null;
};

export default Index;