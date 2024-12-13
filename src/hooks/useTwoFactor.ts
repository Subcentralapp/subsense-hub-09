import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as OTPAuth from "otpauth";

export const useTwoFactor = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("two_factor_enabled, two_factor_secret")
        .eq("id", user.id)
        .single();

      if (profile) {
        setIsEnabled(profile.two_factor_enabled);
        setSecret(profile.two_factor_secret);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du statut 2FA:", error);
    }
  };

  const enable2FA = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Utilisateur non connecté");

      // Générer un nouveau secret de 20 bytes (160 bits) et le convertir en base32
      const newSecret = new OTPAuth.Secret({ size: 20 });
      setSecret(newSecret.base32);

      return newSecret.base32;
    } catch (error) {
      console.error("Erreur lors de l'activation du 2FA:", error);
      throw error;
    }
  };

  const verify2FA = async (code: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || !secret) return false;

      // Vérifier le code
      const totp = new OTPAuth.TOTP({
        secret: secret,
        algorithm: "SHA1",
        digits: 6,
        period: 30
      });

      const isValid = totp.validate({ token: code, window: 1 }) !== null;

      if (isValid) {
        // Mettre à jour le profil
        const { error } = await supabase
          .from("profiles")
          .update({
            two_factor_enabled: true,
            two_factor_secret: secret
          })
          .eq("id", user.id);

        if (error) throw error;
        setIsEnabled(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur lors de la vérification du code:", error);
      throw error;
    }
  };

  return {
    isEnabled,
    secret,
    enable2FA,
    verify2FA
  };
};