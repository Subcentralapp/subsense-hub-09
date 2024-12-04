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
    // Check current session on mount
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          return;
        }

        if (!session) {
          console.log("No active session found");
          return;
        }

        console.log("Active session found, checking user preferences...");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError) {
          console.error("Error checking preferences:", preferencesError);
          return;
        }

        if (preferences) {
          console.log("User preferences found, redirecting to dashboard");
          navigate("/dashboard");
        } else {
          console.log("No preferences found, redirecting to onboarding");
          navigate("/onboarding");
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
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
            navigate("/dashboard");
          } else {
            navigate("/onboarding");
          }
        } catch (error) {
          console.error("Error checking preferences after sign in:", error);
        }
      }

      if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        toast({
          title: "Déconnexion réussie",
          description: "À bientôt !",
        });
        navigate("/landing");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
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