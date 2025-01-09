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
    console.log("🔍 Configuration de l'écouteur d'authentification");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 Changement d'état d'authentification:", event);
      
      if (event === 'SIGNED_IN') {
        if (!session) {
          console.log("❌ Session invalide");
          return;
        }

        try {
          // Vérifier si c'est une première connexion en regardant les préférences
          const { data: preferences } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (!preferences) {
            console.log("🆕 Nouvel utilisateur détecté, redirection vers onboarding");
            navigate("/onboarding", { replace: true });
          } else {
            console.log("✅ Utilisateur existant, redirection vers dashboard");
            navigate("/dashboard", { replace: true });
          }
        } catch (error) {
          console.error("❌ Erreur lors de la vérification des préférences:", error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la connexion.",
            variant: "destructive",
          });
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

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
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "Email",
                      password_label: "Mot de passe",
                      email_input_placeholder: "Votre email",
                      password_input_placeholder: "Votre mot de passe",
                      button_label: "Se connecter",
                      loading_button_label: "Connexion en cours...",
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