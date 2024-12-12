import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AuthForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("signin");

  const handleError = (error: any) => {
    console.error("Erreur d'authentification:", error);
    let errorMessage = "Une erreur est survenue lors de l'authentification.";

    if (error.message?.includes("Email not confirmed")) {
      errorMessage = "Veuillez confirmer votre email avant de vous connecter.";
    } else if (error.message?.includes("Invalid login credentials")) {
      errorMessage = "Email ou mot de passe incorrect.";
    } else if (error.message?.includes("User already registered")) {
      errorMessage = "Un compte existe déjà avec cet email.";
      setActiveTab("signin");
    }

    toast({
      title: "Erreur",
      description: errorMessage,
      variant: "destructive",
    });
  };

  return (
    <div className="w-full max-w-md space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Bienvenue sur SubCentral
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Gérez vos abonnements en toute simplicité
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-sm border">
        <Tabs defaultValue={activeTab} className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
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
                },
              }}
              providers={["google"]}
            />
          </TabsContent>

          <TabsContent value="signup">
            <Auth
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
    </div>
  );
};