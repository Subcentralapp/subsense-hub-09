import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import EmailConfirmation from "./EmailConfirmation";
import { useNavigate } from "react-router-dom";
import { AuthError } from "@supabase/supabase-js";

const AuthForm = () => {
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
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
        }
      }

      if (event === "SIGNED_OUT") {
        console.log("User signed out");
        setShowEmailConfirmation(false);
      }

      if (event === "USER_UPDATED") {
        console.log("User updated");
        if (session?.user.email_confirmed_at) {
          navigate("/dashboard");
        }
      }
    });

    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_UP" && session) {
        console.log("New sign up, showing email confirmation screen");
        setEmail(session.user.email || "");
        setShowEmailConfirmation(true);
      }

      if (event === "PASSWORD_RECOVERY") {
        toast({
          title: "Réinitialisation du mot de passe",
          description: "Vérifiez vos emails pour réinitialiser votre mot de passe.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
      authSubscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleError = (error: AuthError) => {
    console.error("Auth error:", error);
    
    if (error.message?.includes("User already registered")) {
      toast({
        title: "Compte existant",
        description: "Attention, vous possédez déjà un compte !",
        variant: "destructive",
      });
      return;
    }
    
    if (error.message?.includes("Invalid login credentials")) {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect.",
        variant: "destructive",
      });
      return;
    }

    if (error.status === 429) {
      toast({
        title: "Action limitée",
        description: "Pour des raisons de sécurité, veuillez patienter quelques secondes avant de réessayer.",
        variant: "destructive",
      });
      return;
    }
  };

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
        onError={handleError}
      />
    </div>
  );
};

export default AuthForm;