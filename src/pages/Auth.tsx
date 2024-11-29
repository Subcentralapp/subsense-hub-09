import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

export default function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      if (event === "SIGNED_IN") {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-neutral-light p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-primary">Bienvenue</h1>
          <p className="text-muted-foreground">Connectez-vous pour continuer</p>
        </div>
        
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                background: '#9b87f5',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
              },
              anchor: {
                color: '#9b87f5',
              },
            },
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                button_label: 'Se connecter',
                loading_button_label: 'Connexion en cours...',
                link_text: 'Vous avez déjà un compte ? Connectez-vous',
                password_required: 'Le mot de passe est requis',
                email_required: "L'email est requis",
                email_invalid: "L'email n'est pas valide",
              },
              sign_up: {
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                button_label: "S'inscrire",
                loading_button_label: 'Inscription en cours...',
                link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                password_required: 'Le mot de passe est requis',
                email_required: "L'email est requis",
                email_invalid: "L'email n'est pas valide",
              },
              forgotten_password: {
                link_text: 'Mot de passe oublié ?',
                button_label: 'Envoyer les instructions',
                loading_button_label: 'Envoi en cours...',
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
              },
            },
          }}
        />
      </Card>
    </div>
  );
}