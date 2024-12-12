import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AuthForm } from "@/components/auth/AuthForm";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";

const Auth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkExistingSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log("Session existante détectée, redirection...");
        handleAuthenticatedUser(session);
      }
    };

    checkExistingSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Événement d'authentification:", event, "Session:", session);

      if (event === "SIGNED_IN" && session) {
        console.log("Utilisateur connecté, vérification du compte...");
        handleAuthenticatedUser(session);
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

  const handleAuthenticatedUser = async (session: any) => {
    if (!session.user.email_confirmed_at) {
      console.log("Email non confirmé");
      setEmail(session.user.email);
      setShowConfirmation(true);
      return;
    }

    try {
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
    } catch (error) {
      console.error("Erreur lors de la vérification des préférences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la vérification de votre compte.",
        variant: "destructive",
      });
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
      >
        <AuthForm />
      </motion.div>
    </div>
  );
};

export default Auth;