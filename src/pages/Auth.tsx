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
          console.log("User already authenticated, redirecting to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
        {/* Section de motivation - Version mobile */}
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
              Simplifiez la gestion de vos abonnements
            </h1>
          </motion.div>
        </div>

        {/* Section de motivation - Version desktop */}
        <div className="flex-1 hidden md:block">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Reprenez le contrôle de vos abonnements
            </h1>
            <p className="text-lg text-gray-600">
              Rejoignez des milliers d'utilisateurs qui font déjà des économies sur leurs abonnements.
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
            }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/auth/callback`}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;