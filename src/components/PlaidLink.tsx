import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Lock } from "lucide-react";

declare global {
  interface Window {
    Plaid: any;
  }
}

export const PlaidLink = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePlaidConnection = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.functions.invoke('plaid-link', {
        body: { action: 'create_link_token' }
      });

      if (error) throw error;

      const { link_token } = data;
      const handler = window.Plaid.create({
        token: link_token,
        onSuccess: async (public_token: string) => {
          const { error } = await supabase.functions.invoke('plaid-link', {
            body: { 
              action: 'exchange_public_token',
              public_token 
            }
          });

          if (error) throw error;

          toast({
            title: "Connexion réussie",
            description: "Vos comptes bancaires ont été connectés avec succès.",
          });
        },
        onExit: () => {
          toast({
            title: "Connexion annulée",
            description: "La connexion à votre compte bancaire a été annulée.",
            variant: "destructive",
          });
        },
      });

      handler.open();
    } catch (error) {
      console.error('Erreur Plaid:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion à votre compte bancaire.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Alert>
        <Shield className="h-4 w-4" />
        <AlertDescription>
          Vos données bancaires sont sécurisées et chiffrées. Nous utilisons Plaid, un service certifié conforme aux normes bancaires internationales.
        </AlertDescription>
      </Alert>
      
      <Alert>
        <Lock className="h-4 w-4" />
        <AlertDescription>
          Nous n'avons jamais accès à vos identifiants bancaires. Toutes les connexions sont gérées de manière sécurisée par Plaid.
        </AlertDescription>
      </Alert>

      <Button 
        onClick={handlePlaidConnection}
        disabled={loading}
        className="w-full"
      >
        {loading ? "Connexion en cours..." : "Connecter mon compte bancaire"}
      </Button>
    </div>
  );
};