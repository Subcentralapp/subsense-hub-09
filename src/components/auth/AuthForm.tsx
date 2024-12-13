import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EmailConfirmation from "./EmailConfirmation";
import { useNavigate } from "react-router-dom";
import { EmailConfirmationHandler } from "./EmailConfirmationHandler";

const AuthForm = () => {
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      console.log("Vérification de la session utilisateur...");
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Erreur lors de la vérification de la session:", sessionError);
        return;
      }

      if (session?.user) {
        if (session.user.email_confirmed_at) {
          console.log("Email confirmé, redirection vers le tableau de bord");
          navigate("/dashboard");
        } else {
          console.log("Email non confirmé, affichage de l'écran de confirmation");
          setEmail(session.user.email || "");
          setShowEmailConfirmation(true);
        }
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Changement d'état d'authentification:", event);

      if (event === "SIGNED_IN") {
        if (session?.user.email_confirmed_at) {
          console.log("Email confirmé, redirection vers le tableau de bord");
          navigate("/dashboard");
          return;
        }
        
        if (session?.user.email) {
          console.log("Email non confirmé, affichage de l'écran de confirmation");
          setEmail(session.user.email);
          setShowEmailConfirmation(true);
        }
      }

      if (event === "SIGNED_OUT") {
        console.log("Utilisateur déconnecté");
        setShowEmailConfirmation(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  if (showEmailConfirmation) {
    return <EmailConfirmation email={email} onBack={() => setShowEmailConfirmation(false)} />;
  }

  return (
    <div className="bg-background rounded-lg border p-8">
      <EmailConfirmationHandler />
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#2563eb',
                brandAccent: '#1d4ed8',
              },
            },
          },
        }}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Mot de passe",
              email_input_placeholder: "Votre email",
              password_input_placeholder: "Votre mot de passe",
              button_label: "S'inscrire",
              loading_button_label: "Inscription en cours...",
              social_provider_text: "Continuer avec {{provider}}",
              link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
              confirmation_text: "Vérifiez vos emails pour confirmer votre inscription",
            },
            sign_in: {
              email_label: "Email",
              password_label: "Mot de passe",
              email_input_placeholder: "Votre email",
              password_input_placeholder: "Votre mot de passe",
              button_label: "Se connecter",
              loading_button_label: "Connexion en cours...",
              social_provider_text: "Continuer avec {{provider}}",
              link_text: "Vous avez déjà un compte ? Connectez-vous",
            },
            forgotten_password: {
              email_label: "Email",
              password_label: "Mot de passe",
              button_label: "Réinitialiser le mot de passe",
              loading_button_label: "Envoi en cours...",
              link_text: "Mot de passe oublié ?",
              confirmation_text: "Vérifiez vos emails pour réinitialiser votre mot de passe",
            },
          },
        }}
      />
    </div>
  );
};

export default AuthForm;