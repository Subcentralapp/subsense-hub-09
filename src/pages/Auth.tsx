import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [existingAccount, setExistingAccount] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Session existante, redirection vers le tableau de bord");
        navigate("/dashboard");
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: 'INITIAL_SESSION' | 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'USER_DELETED' | 'PASSWORD_RECOVERY' | 'TOKEN_REFRESHED' | 'SIGNED_UP', session) => {
        console.log("Changement d'état d'authentification:", event);
        
        if (event === "SIGNED_IN" && session) {
          console.log("Utilisateur connecté, redirection vers le tableau de bord");
          navigate("/dashboard");
        } else if (event === "SIGNED_UP" && session) {
          console.log("Nouvel utilisateur inscrit, vérification du compte existant");
          const email = session?.user?.email;
          if (email) {
            const { data } = await supabase
              .from('profiles')
              .select('id')
              .eq('id', session.user.id)
              .single();

            if (data) {
              setExistingAccount(true);
              toast({
                title: "Compte existant",
                description: "Un compte existe déjà avec cette adresse email. Veuillez vous connecter.",
                variant: "destructive",
              });
            } else {
              setEmail(email);
              setShowConfirmation(true);
            }
          }
        } else if (event === "USER_UPDATED" && session) {
          console.log("Utilisateur mis à jour, vérification de l'email");
          if (session?.user?.email_confirmed_at) {
            toast({
              title: "Email confirmé !",
              description: "Vous pouvez maintenant vous connecter à votre compte.",
            });
            setShowConfirmation(false);
          }
        }
      }
    );

    const emailConfirmed = searchParams.get("email_confirmed");
    if (emailConfirmed === "true") {
      toast({
        title: "Email confirmé !",
        description: "Vous pouvez maintenant vous connecter à votre compte.",
      });
    }

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, searchParams, toast]);

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
            Bienvenue
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Connectez-vous ou créez un compte pour commencer
          </p>
        </div>

        {existingAccount && (
          <Alert variant="destructive">
            <AlertDescription>
              Un compte existe déjà avec cette adresse email. Veuillez vous connecter.
            </AlertDescription>
          </Alert>
        )}

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <SupabaseAuth
            supabaseClient={supabase}
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
                  link_text: "Vous avez déjà un compte ? Connectez-vous",
                },
                sign_up: {
                  email_label: "Adresse email",
                  password_label: "Mot de passe",
                  email_input_placeholder: "Votre adresse email",
                  password_input_placeholder: "Votre mot de passe",
                  button_label: "S'inscrire",
                  loading_button_label: "Inscription en cours...",
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
            redirectTo={`${window.location.origin}/auth?email_confirmed=true`}
          />
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