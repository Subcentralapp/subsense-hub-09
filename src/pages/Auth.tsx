import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking session:", error);
          return;
        }

        if (session && mounted) {
          console.log("Active session found, checking preferences...");
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
        }
      } catch (error) {
        console.error("Error in checkSession:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event);
      
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

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex gap-8 items-center">
        {/* Section de motivation */}
        <div className="flex-1 hidden md:block">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Gérez vos abonnements intelligemment
            </h1>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Visualisez vos dépenses</h3>
                  <p className="text-sm text-muted-foreground">
                    Obtenez une vue claire de tous vos abonnements et de leurs coûts
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Économisez de l'argent</h3>
                  <p className="text-sm text-muted-foreground">
                    Identifiez les abonnements superflus et optimisez vos dépenses
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Ne manquez aucune échéance</h3>
                  <p className="text-sm text-muted-foreground">
                    Recevez des rappels pour vos paiements et périodes d'essai
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'authentification */}
        <div className="w-full max-w-md glass-card p-8 rounded-xl">
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
    </div>
  );
}