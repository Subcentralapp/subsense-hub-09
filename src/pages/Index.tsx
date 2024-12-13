import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Checking authentication status...");
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          navigate("/landing");
          return;
        }

        if (!session) {
          console.log("👤 No user found, redirecting to landing page");
          navigate("/landing");
          return;
        }

        console.log("✅ User found, checking preferences...");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("❌ Error checking user preferences:", preferencesError);
          navigate("/landing");
          return;
        }

        if (!preferences) {
          console.log("🆕 No preferences found, redirecting to onboarding");
          navigate("/onboarding");
        } else {
          console.log("✅ Preferences found, redirecting to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("❌ Error in checkAuth:", error);
        navigate("/landing");
      } finally {
        setIsLoading(false);
      }
    };

    // Vérifier l'authentification au chargement
    checkAuth();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Auth state changed:", event, session ? "Session exists" : "No session");
      
      if (event === 'SIGNED_IN' && session) {
        const { data: preferences } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (!preferences) {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      } else if (event === 'SIGNED_OUT') {
        navigate("/landing");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
};

export default Index;