import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("Utilisateur déjà authentifié, redirection vers le tableau de bord");
          navigate("/dashboard", { replace: true });
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du statut d'authentification:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Changement d'état d'authentification:", event, session);
      if (event === 'SIGNED_IN' && session) {
        console.log("Utilisateur connecté, redirection vers le tableau de bord");
        navigate("/dashboard", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4 pt-24 md:pt-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
        {/* Section motivation mobile */}
        <div className="w-full md:hidden space-y-3 text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Offre de lancement</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 px-4">
              Gérez vos abonnements facilement
            </h1>
          </motion.div>
        </div>

        {/* Section motivation desktop */}
        <div className="flex-1 hidden md:block">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Prenez le contrôle de vos abonnements
            </h1>
            <p className="text-lg text-gray-600">
              Rejoignez des milliers d'utilisateurs qui économisent déjà sur leurs abonnements.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Visualisez vos dépenses</h3>
                  <p className="text-sm text-gray-500">
                    Obtenez une vue claire de tous vos abonnements
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Économisez de l'argent</h3>
                  <p className="text-sm text-gray-500">
                    Identifiez les doublons et optimisez vos dépenses
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Ne manquez aucun paiement</h3>
                  <p className="text-sm text-gray-500">
                    Recevez des rappels pour vos échéances
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire d'authentification */}
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
                },
                magic_link: {
                  button_label: 'Connexion avec un lien magique',
                  link_text: 'Envoyer un lien magique',
                },
                forgotten_password: {
                  button_label: 'Mot de passe oublié ?',
                  link_text: 'Mot de passe oublié ?',
                },
              },
            }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/auth/callback`}
            requireEmailConfirmation={true}
            passwordMinLength={8}
            passwordValidation={/^(?=.*[!@#$%^&*])/}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;