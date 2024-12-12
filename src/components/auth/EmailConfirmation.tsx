import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EmailConfirmationProps {
  email: string;
  onBack: () => void;
}

const EmailConfirmation = ({ email, onBack }: EmailConfirmationProps) => {
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(300); // 5 minutes
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResendEmail = async () => {
    if (!canResend) {
      toast({
        title: "Patientez",
        description: "Veuillez attendre avant de renvoyer un nouvel email.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      toast({
        title: "Email envoyé",
        description: "Un nouvel email de confirmation vous a été envoyé.",
      });
      
      setCanResend(false);
      setCountdown(300);
    } catch (error) {
      console.error("Error resending email:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer l'email. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 text-center">
      <h3 className="text-2xl font-semibold">Vérifiez votre email</h3>
      <p className="text-muted-foreground">
        Un email de confirmation a été envoyé à {email}.<br />
        Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation.
      </p>

      <div className="space-y-4">
        {!canResend && (
          <p className="text-sm text-muted-foreground">
            Vous pourrez renvoyer l'email dans {formatTime(countdown)}
          </p>
        )}

        <Button
          onClick={handleResendEmail}
          disabled={!canResend}
          variant="outline"
          className="w-full"
        >
          Renvoyer l'email de confirmation
        </Button>

        <Button
          onClick={onBack}
          variant="ghost"
          className="w-full"
        >
          Retour
        </Button>
      </div>
    </div>
  );
};

export default EmailConfirmation;