import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import QRCode from "qrcode";
import { useTwoFactor } from "@/hooks/useTwoFactor";

export const TwoFactorSetup = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const { toast } = useToast();
  const { enable2FA, verify2FA, isEnabled, secret } = useTwoFactor();

  const handleEnable2FA = async () => {
    try {
      const secret = await enable2FA();
      if (secret) {
        const url = await QRCode.toDataURL(
          `otpauth://totp/SubManager:${(await supabase.auth.getUser()).data.user?.email}?secret=${secret}&issuer=SubManager`
        );
        setQrCodeUrl(url);
      }
    } catch (error) {
      console.error("Erreur lors de l'activation du 2FA:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'activer l'authentification à deux facteurs",
        variant: "destructive",
      });
    }
  };

  const handleVerify = async () => {
    try {
      const success = await verify2FA(verificationCode);
      if (success) {
        toast({
          title: "Succès",
          description: "L'authentification à deux facteurs a été activée",
        });
        setQrCodeUrl(null);
        setVerificationCode("");
      } else {
        toast({
          title: "Erreur",
          description: "Code de vérification incorrect",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la vérification:", error);
      toast({
        title: "Erreur",
        description: "Impossible de vérifier le code",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Authentification à deux facteurs (2FA)
      </h2>
      
      {!isEnabled && !qrCodeUrl && (
        <div className="space-y-4">
          <p className="text-muted-foreground">
            L'authentification à deux facteurs ajoute une couche de sécurité supplémentaire à votre compte.
          </p>
          <Button onClick={handleEnable2FA}>Activer le 2FA</Button>
        </div>
      )}

      {qrCodeUrl && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            1. Scannez ce QR code avec votre application d'authentification (Google Authenticator, Authy, etc.)
          </p>
          <div className="flex justify-center mb-4">
            <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48" />
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            2. Entrez le code à 6 chiffres généré par votre application
          </p>
          <div className="flex gap-2">
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Code à 6 chiffres"
              maxLength={6}
              className="w-40"
            />
            <Button onClick={handleVerify}>Vérifier</Button>
          </div>
        </div>
      )}

      {isEnabled && !qrCodeUrl && (
        <div className="space-y-4">
          <p className="text-green-600 dark:text-green-400">
            ✓ L'authentification à deux facteurs est activée
          </p>
          <p className="text-sm text-muted-foreground">
            Vous devrez entrer un code de vérification à chaque connexion.
          </p>
        </div>
      )}
    </Card>
  );
};