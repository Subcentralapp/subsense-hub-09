import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomSignUpForm } from "@/components/auth/CustomSignUpForm";
import EmailConfirmation from "@/components/auth/EmailConfirmation";
import { EmailConfirmationHandler } from "@/components/auth/EmailConfirmationHandler";

const Identification = () => {
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up auth state change listener");
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (session?.user.email_confirmed_at) {
        console.log("Email confirmé, redirection vers onboarding");
        navigate("/onboarding");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleEmailSent = (email: string) => {
    setEmail(email);
    setShowEmailConfirmation(true);
  };

  if (showEmailConfirmation) {
    return <EmailConfirmation email={email} onBack={() => setShowEmailConfirmation(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
            Bienvenue
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous ou créez un compte pour continuer
          </p>
        </div>

        <div className="bg-background rounded-lg border p-8">
          <EmailConfirmationHandler />
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <Auth
                supabaseClient={supabase}
                view="sign_in"
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
            </TabsContent>
            
            <TabsContent value="signup">
              <CustomSignUpForm onEmailSent={handleEmailSent} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Identification;