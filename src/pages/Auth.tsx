import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const handleAuthChange = async (event: any, session: any) => {
    console.log("Événement d'authentification:", event, "Session:", session);

    if (event === "SIGNED_IN" && session) {
      console.log("Utilisateur connecté, vérification du compte...");
      
      if (!session.user.email_confirmed_at) {
        console.log("Email non confirmé");
        setEmail(session.user.email);
        setShowConfirmation(true);
        return;
      }

      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!preferences) {
        console.log("Redirection vers onboarding");
        navigate("/onboarding");
      } else {
        console.log("Redirection vers dashboard");
        navigate("/dashboard");
      }
    } else if (event === "SIGNED_UP" && session) {
      console.log("Nouvel utilisateur inscrit");
      setEmail(session.user.email);
      setShowConfirmation(true);
    }
  };

  if (showConfirmation && email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <EmailConfirmation email={email} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Bienvenue sur SubCentral
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Gérez vos abonnements en toute simplicité
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Connexion</TabsTrigger>
              <TabsTrigger value="signup">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <SupabaseAuth
                supabaseClient={supabase}
                view="sign_in"
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#1a237e",
                        brandAccent: "#121858",
                      },
                    },
                  },
                  className: {
                    container: "space-y-4",
                    label: "text-sm font-medium text-gray-700",
                    button: "w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                    input: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm",
                  },
                }}
                localization={{
                  variables: {
                    sign_in: {
                      email_label: "Adresse email",
                      password_label: "Mot de passe",
                      email_input_placeholder: "Votre adresse email",
                      password_input_placeholder: "Votre mot de passe",
                      button_label: "Se connecter",
                      loading_button_label: "Connexion en cours...",
                      social_provider_text: "Continuer avec {{provider}}",
                      link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                    },
                    forgotten_password: {
                      email_label: "Adresse email",
                      password_label: "Mot de passe",
                      email_input_placeholder: "Votre adresse email",
                      button_label: "Réinitialiser le mot de passe",
                      loading_button_label: "Envoi du lien de réinitialisation...",
                      link_text: "Mot de passe oublié ?",
                    },
                  },
                }}
                providers={["google"]}
                onAuthStateChange={handleAuthChange}
              />
            </TabsContent>

            <TabsContent value="signup">
              <SupabaseAuth
                supabaseClient={supabase}
                view="sign_up"
                appearance={{
                  theme: ThemeSupa,
                  variables: {
                    default: {
                      colors: {
                        brand: "#1a237e",
                        brandAccent: "#121858",
                      },
                    },
                  },
                  className: {
                    container: "space-y-4",
                    label: "text-sm font-medium text-gray-700",
                    button: "w-full px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                    input: "block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm",
                  },
                }}
                localization={{
                  variables: {
                    sign_up: {
                      email_label: "Adresse email",
                      password_label: "Mot de passe",
                      email_input_placeholder: "Votre adresse email",
                      password_input_placeholder: "Votre mot de passe",
                      button_label: "S'inscrire",
                      loading_button_label: "Inscription en cours...",
                      social_provider_text: "Continuer avec {{provider}}",
                      link_text: "Vous avez déjà un compte ? Connectez-vous",
                    },
                  },
                }}
                providers={["google"]}
                onAuthStateChange={handleAuthChange}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            En vous connectant, vous acceptez nos{" "}
            <a href="/terms" className="font-medium text-primary hover:text-primary/80">
              conditions d'utilisation
            </a>{" "}
            et notre{" "}
            <a href="/privacy" className="font-medium text-primary hover:text-primary/80">
              politique de confidentialité
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;