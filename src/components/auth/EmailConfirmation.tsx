import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export const EmailConfirmation = ({ email }: { email: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutes en secondes
  const { toast } = useToast();

  const handleResendEmail = async () => {
    if (!canResend) return;
    
    try {
      setIsLoading(true);
      console.log("Tentative de renvoi de l'email de confirmation à:", email);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) {
        console.error("Erreur lors du renvoi de l'email:", error);
        throw error;
      }

      setCanResend(false);
      let timeLeft = 300; // 5 minutes en secondes
      setCountdown(timeLeft);

      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
        
        if (timeLeft === 0) {
          clearInterval(timer);
          setCanResend(true);
        }
      }, 1000);

      console.log("Email de confirmation renvoyé avec succès");
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md text-center space-y-6 p-8 bg-white rounded-lg shadow-sm border"
    >
      <div className="space-y-2">
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
            `Réessayer dans ${formatTime(countdown)}`
          ) : (
            "Renvoyer l'email de confirmation"
          )}
        </Button>
      </div>

      <p className="text-sm text-gray-500">
        Si vous ne recevez toujours pas l'email, contactez notre{" "}
        <a href="/support" className="text-primary hover:text-primary/80 font-medium">
          support client
        </a>
      </p>
    </motion.div>
  );
};