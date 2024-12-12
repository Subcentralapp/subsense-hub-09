import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthError, AuthResponse, AuthChangeEvent, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const Identification = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes en secondes
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email_confirmed_at) {
        console.log("Session active détectée, redirection...");
        handleAuthenticatedUser(session);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event: AuthChangeEvent, session: Session | null) => {
      console.log("Événement d'authentification:", event);

      if (event === "SIGNED_IN" && session) {
        if (session.user.email_confirmed_at) {
          console.log("Utilisateur connecté avec email confirmé");
          handleAuthenticatedUser(session);
        } else {
          console.log("Email non confirmé");
          setEmail(session.user.email);
          setShowConfirmation(true);
        }
      } else if (event === "SIGNED_UP" && session) {
        console.log("Nouvel utilisateur inscrit");
        setEmail(session.user.email);
        setShowConfirmation(true);
        toast({
          title: "Inscription réussie !",
          description: "Veuillez vérifier votre email pour confirmer votre compte.",
        });
      } else if (event === "USER_UPDATED" && session?.user.email_confirmed_at) {
        console.log("Email confirmé, redirection...");
        handleAuthenticatedUser(session);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleAuthenticatedUser = async (session: Session) => {
    try {
      const { data: preferences } = await supabase
        .from("user_preferences")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!preferences) {
        console.log("Redirection vers onboarding");
        navigate("/onboarding");
      } else {
        console.log("Redirection vers dashboard");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des préférences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification de votre compte.",
        variant: "destructive",
      });
    }
  };

  const handleResendEmail = async () => {
    if (!canResend || !email) return;
    
    try {
      setIsLoading(true);
      console.log("Tentative de renvoi de l'email de confirmation à:", email);
      
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
      });

      if (error) throw error;

      setCanResend(false);
      let timeLeft = 300; // 5 minutes
      setCountdown(timeLeft);

      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        
        if (timeLeft === 0) {
          clearInterval(timer);
          setCanResend(true);
        }
      }, 1000);

      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte de réception et vos spams.",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email de confirmation.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const EmailConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm border"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Vérifiez votre email</h2>
        <p className="text-gray-600">
          Un email de confirmation a été envoyé à{" "}
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Vous n'avez pas reçu l'email ? Vérifiez vos spams ou cliquez ci-dessous pour recevoir un nouvel email.
        </p>
        
        <Button
          onClick={handleResendEmail}
          disabled={isLoading || !canResend}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Envoi en cours...
            </>
          ) : !canResend ? (
            `Réessayer dans ${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
          ) : (
            "Renvoyer l'email de confirmation"
          )}
        </Button>
      </div>

      <p className="text-sm text-center text-gray-500">
        Si vous ne recevez toujours pas l'email, contactez notre{" "}
        <a href="/support" className="text-primary hover:text-primary/80 font-medium">
          support client
        </a>
      </p>
    </motion.div>
  );

  if (showConfirmation && email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
        <EmailConfirmation />
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
          <Auth
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
                  link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                },
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
          />
        </div>

        <p className="text-center text-sm text-gray-600">
          En vous connectant, vous acceptez nos{" "}
          <a href="/terms" className="font-medium text-primary hover:text-primary/80">
            conditions d'utilisation
          </a>{" "}
          et notre{" "}
          <a href="/privacy" className="font-medium text-primary hover:text-primary/80">
            politique de confidentialité
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Identification;