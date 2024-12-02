import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error("Error checking session:", error);
        return;
      }
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Connexion réussie",
          description: "Bienvenue !",
        });
        navigate("/dashboard");
      }

      if (event === 'SIGNED_OUT') {
        toast({
          title: "Déconnexion réussie",
          description: "À bientôt !",
        });
      }

      if (event === 'USER_UPDATED') {
        console.log("User profile updated");
      }

      // Handle specific error events
      if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Réinitialisation du mot de passe",
          description: "Vérifiez votre boîte mail pour les instructions.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-neutral-light p-4">
      <Card className="w-full max-w-md p-6 space-y-6 relative">
        <Button
          variant="ghost"
          className="absolute left-4 top-4"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>

        <div className="text-center space-y-2 mt-8">
          <h1 className="text-2xl font-bold text-primary">Commencez à économiser dès aujourd'hui</h1>
          <p className="text-muted-foreground">Rejoignez des milliers d'utilisateurs qui optimisent déjà leurs dépenses</p>
        </div>
        
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                background: '#9b87f5',
                color: 'white',
                borderRadius: '6px',
                cursor: 'pointer',
              },
              anchor: {
                color: '#9b87f5',
              },
              message: {
                color: 'red',
              },
            },
          }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/auth/callback`}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                button_label: 'Se connecter',
                loading_button_label: 'Connexion en cours...',
                link_text: 'Vous avez déjà un compte ? Connectez-vous',
                email_input_placeholder: 'Votre adresse email',
                password_input_placeholder: 'Votre mot de passe',
                social_provider_text: 'Continuer avec {{provider}}',
              },
              sign_up: {
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                button_label: "Créer mon compte",
                loading_button_label: 'Inscription en cours...',
                link_text: "Pas encore de compte ? Inscrivez-vous",
                email_input_placeholder: 'Votre adresse email',
                password_input_placeholder: 'Choisissez un mot de passe',
                social_provider_text: 'Continuer avec {{provider}}',
              },
              forgotten_password: {
                link_text: 'Mot de passe oublié ?',
                button_label: 'Envoyer les instructions',
                loading_button_label: 'Envoi en cours...',
                email_label: 'Adresse email',
                password_label: 'Mot de passe',
                email_input_placeholder: 'Votre adresse email',
              },
            },
          }}
        />
      </Card>
    </div>
  );
}