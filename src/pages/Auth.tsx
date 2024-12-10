import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { MotivationSection } from "@/components/auth/MotivationSection";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";
import { useState, useEffect } from "react";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const { isLoading } = useAuthRedirect();
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    console.log("Setting up auth state change listener");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === "SIGNED_UP" && session?.user?.email) {
        console.log("User signed up successfully:", session.user.email);
        setUserEmail(session.user.email);
        setShowEmailConfirmation(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (showEmailConfirmation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center">
        <EmailConfirmation email={userEmail} />
      </div>
    );
  }

  const handleError = (error: AuthError) => {
    console.error("Erreur d'authentification:", error);
    
    if (error.message.includes('User already registered')) {
      toast({
        title: "Compte existant",
        description: "Un compte existe déjà avec cet email. Veuillez vous connecter.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4 pt-24 md:pt-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
        <MotivationSection isMobile={true} />
        <MotivationSection />

        <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1a237e',
                    brandAccent: '#1a237e',
                  },
                },
              },
              className: {
                container: 'auth-container',
                label: 'auth-label text-gray-700',
                button: 'auth-button',
                divider: 'auth-divider',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                  email_input_placeholder: 'Votre adresse email',
                  password_input_placeholder: 'Votre mot de passe',
                  link_text: 'Déjà inscrit ? Connectez-vous',
                },
                sign_up: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe (min. 8 caractères avec 1 caractère spécial)',
                  button_label: 'Créer un compte',
                  email_input_placeholder: 'Votre adresse email',
                  password_input_placeholder: 'Choisissez un mot de passe sécurisé',
                  link_text: 'Pas encore de compte ? Inscrivez-vous',
                  confirmation_text: 'Vérifiez votre email pour confirmer votre inscription',
                },
              },
            }}
            providers={[]}
            redirectTo={`${window.location.origin}/auth/callback`}
            onError={handleError}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;