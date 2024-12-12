import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const EmailConfirmation = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResendEmail = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte de réception.",
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4 p-6 bg-white rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold text-gray-900">Vérifiez votre email</h2>
      <p className="text-gray-600">
        Un email de confirmation a été envoyé à <span className="font-medium">{email}</span>
      </p>
      <p className="text-sm text-gray-500">
        Vous n'avez pas reçu l'email ?
      </p>
      <Button
        onClick={handleResendEmail}
        disabled={isLoading}
        variant="outline"
        className="mt-2"
      >
        {isLoading ? "Envoi en cours..." : "Renvoyer l'email"}
      </Button>
    </motion.div>
  );
};