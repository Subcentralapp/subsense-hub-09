import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export const AuthFormContainer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("État d'authentification changé:", event, session);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
        navigate("/dashboard");
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Récupération du mot de passe",
          description: "Consultez votre boîte mail pour réinitialiser votre mot de passe.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="w-full max-w-md space-y-8">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#7E69AB',
                brandAccent: '#9b87f5',
              },
            },
          },
        }}
        providers={[]}
        view="sign_in_with_password"
        theme="light"
        showLinks={true}
        redirectTo={window.location.origin}
        localization={{
          variables: {
            sign_in: {
              email_label: "Adresse email",
              password_label: "Mot de passe",
              email_input_placeholder: "Votre adresse email",
              password_input_placeholder: "Votre mot de passe",
              button_label: "Se connecter",
              loading_button_label: "Connexion en cours...",
              link_text: "Vous avez déjà un compte ? Connectez-vous",
            },
            forgotten_password: {
              email_label: "Adresse email",
              password_label: "Mot de passe",
              email_input_placeholder: "Votre adresse email",
              button_label: "Envoyer les instructions",
              loading_button_label: "Envoi des instructions en cours...",
              link_text: "Mot de passe oublié ?",
              confirmation_text: "Vérifiez vos emails pour réinitialiser votre mot de passe",
            },
            sign_up: {
              email_label: "Adresse email",
              password_label: "Mot de passe",
              email_input_placeholder: "Votre adresse email",
              password_input_placeholder: "Votre mot de passe",
              button_label: "S'inscrire",
              loading_button_label: "Inscription en cours...",
              link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
            }
          }
        }}
      />
    </div>
  );
};