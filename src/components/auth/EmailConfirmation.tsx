import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export const EmailConfirmation = ({ email }: { email: string }) => {
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast({
        title: "Email envoyé !",
        description: "Vérifiez votre boîte de réception pour confirmer votre email.",
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email de confirmation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto p-4"
    >
      <Card className="p-6 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Vérifiez votre email</h2>
          <p className="text-muted-foreground">
            Nous avons envoyé un lien de confirmation à
          </p>
          <p className="font-medium">{email}</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Cliquez sur le lien dans l'email pour activer votre compte. Si vous ne trouvez pas l'email, vérifiez votre dossier spam.
          </p>

          <Button
            variant="outline"
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full"
          >
            {isResending ? "Envoi en cours..." : "Renvoyer l'email de confirmation"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};