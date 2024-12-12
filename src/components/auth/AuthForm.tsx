import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EmailConfirmation from "./EmailConfirmation";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        console.log("User already logged in, redirecting to dashboard");
        navigate("/dashboard");
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session);

      if (event === "SIGNED_IN") {
        if (session?.user.email_confirmed_at) {
          console.log("User signed in and email confirmed, redirecting to dashboard");
          navigate("/dashboard");
        } else {
          console.log("Email not confirmed, showing confirmation screen");
          setEmail(session?.user.email || "");
          setShowEmailConfirmation(true);
        }
      }

      if (event === "SIGNED_OUT") {
        console.log("User signed out");
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
        providers={["google"]}
        localization={{
          variables: {
            sign_in: {
              email_label: "Email",
              password_label: "Mot de passe",
              button_label: "Se connecter",
              loading_button_label: "Connexion en cours...",
              social_provider_text: "Continuer avec {{provider}}",
              link_text: "Vous avez déjà un compte ? Connectez-vous",
            },
            sign_up: {
              email_label: "Email",
              password_label: "Mot de passe",
              button_label: "S'inscrire",
              loading_button_label: "Inscription en cours...",
              social_provider_text: "Continuer avec {{provider}}",
              link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
            },
            forgotten_password: {
              email_label: "Email",
              button_label: "Réinitialiser le mot de passe",
              loading_button_label: "Envoi en cours...",
              link_text: "Mot de passe oublié ?",
            },
          },
        }}
      />
    </div>
  );
};

export default AuthForm;