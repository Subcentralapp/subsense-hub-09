import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("No active session found in Auth page");
          return;
        }

        console.log("Active session found in Auth page, checking preferences...");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("Error checking preferences:", preferencesError);
          return;
        }

        if (preferences) {
          console.log("User preferences found, redirecting to dashboard");
          navigate("/dashboard", { replace: true });
        } else {
          console.log("No preferences found, redirecting to onboarding");
          navigate("/onboarding", { replace: true });
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed in Auth page:", event);
      
      if (event === 'SIGNED_IN' && session) {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
        });

        try {
          const { data: preferences, error: preferencesError } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (preferencesError && preferencesError.code !== 'PGRST116') {
            console.error("Error checking preferences:", preferencesError);
            return;
          }

          if (preferences) {
            navigate("/dashboard", { replace: true });
          } else {
            navigate("/onboarding", { replace: true });
          }
        } catch (error) {
          console.error("Error checking preferences after sign in:", error);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#000000',
                  brandAccent: '#333333',
                },
              },
            },
          }}
          providers={['google']}
        />
      </div>
    </div>
  );
}