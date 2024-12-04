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
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No session found");
        return;
      }

      console.log("Session found, checking user preferences...");
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id);

        if (error) {
          console.error("Error checking preferences:", error);
          return;
        }

        if (data && data.length > 0) {
          console.log("User has preferences, redirecting to dashboard");
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN') {
        console.log("User signed in, checking preferences...");
        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
        });

        if (session) {
          try {
            const { data, error } = await supabase
              .from('user_preferences')
              .select('*')
              .eq('id', session.user.id);

            if (error) {
              console.error("Error checking preferences:", error);
              return;
            }

            if (data && data.length > 0) {
              console.log("User has preferences, redirecting to dashboard");
              navigate("/dashboard");
            } else {
              console.log("No preferences found, redirecting to onboarding");
              navigate("/onboarding");
            }
          } catch (error) {
            console.error("Error checking preferences after sign in:", error);
          }
        }
      }

      if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        toast({
          title: "Déconnexion réussie",
          description: "À bientôt !",
        });
        navigate("/home");
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