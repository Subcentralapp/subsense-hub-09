import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const EmailConfirmationHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const isEmailConfirmed = searchParams.get("email_confirmed") === "true";
      
      if (isEmailConfirmed) {
        console.log("Email confirmation detected in URL");
        
        try {
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError) {
            console.error("Error getting session:", sessionError);
            throw sessionError;
          }

          if (session?.user) {
            console.log("User session found, updating email verification status");
            
            // Force refresh the session
            const { data: { session: refreshedSession }, error: refreshError } = 
              await supabase.auth.refreshSession();
              
            if (refreshError) {
              console.error("Error refreshing session:", refreshError);
              throw refreshError;
            }

            if (refreshedSession?.user?.email_confirmed_at) {
              console.log("Email confirmed successfully");
              toast({
                title: "Email confirmé",
                description: "Votre email a été vérifié avec succès. Vous pouvez maintenant vous connecter.",
              });
              // Rediriger vers la page de connexion après confirmation
              navigate("/identification", { replace: true });
            }
          }
        } catch (error) {
          console.error("Error during email confirmation:", error);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la confirmation de votre email.",
            variant: "destructive",
          });
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, toast]);

  return null;
};