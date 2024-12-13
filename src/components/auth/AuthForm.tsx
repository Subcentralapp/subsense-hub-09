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
      console.log("Checking user session...");
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session check error:", sessionError);
        return;
      }

      if (session?.user) {
        console.log("User session found:", {
          id: session.user.id,
          email: session.user.email,
          emailConfirmed: session.user.email_confirmed_at
        });

        if (!session.user.email_confirmed_at) {
          console.log("Email not confirmed, showing confirmation screen");
          setEmail(session.user.email || "");
          setShowEmailConfirmation(true);
        } else {
          console.log("Email confirmed, redirecting to dashboard");
          navigate("/dashboard");
        }
      } else {
        console.log("No active session found");
      }
    };
    
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", {
        event: event,
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        emailConfirmed: session?.user?.email_confirmed_at
      });

      if (session?.user) {
        // Vérifier à nouveau la session après un changement d'état
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        console.log("Current session after state change:", {
          emailConfirmed: currentSession?.user?.email_confirmed_at
        });

        if (currentSession?.user?.email_confirmed_at) {
          console.log("Email confirmed in current session, redirecting to dashboard");
          navigate("/dashboard");
          toast({
            title: "Email confirmé",
            description: "Votre compte a été vérifié avec succès.",
          });
          return;
        }

        if (!currentSession?.user?.email_confirmed_at) {
          console.log("Email still not confirmed, showing confirmation screen");
          setEmail(session.user.email || "");
          setShowEmailConfirmation(true);
          return;
        }
      }

      if (event === "SIGNED_OUT") {
        console.log("User signed out, resetting confirmation screen");
        setShowEmailConfirmation(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleError = (error: AuthError) => {
    console.error("Auth error:", error);
    
    if (error.message?.includes("Email not confirmed")) {
      console.log("Email not confirmed error, showing confirmation screen");
      setShowEmailConfirmation(true);
      return;
    }
    
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

    toast({
      title: "Erreur",
      description: error.message || "Une erreur est survenue",
      variant: "destructive",
    });
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
      />
    </div>
  );
};

export default AuthForm;