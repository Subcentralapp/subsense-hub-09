import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "lucide-react";

interface SecurityInfoProps {
  user: any;
}

export const SecurityInfo = ({ user }: SecurityInfoProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2" />
        Sécurité
      </h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Dernière connexion</label>
          <p className="mt-1">{new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</p>
        </div>
        <Separator />
        <div>
          <label className="text-sm font-medium text-muted-foreground">Méthode d'authentification</label>
          <p className="mt-1 capitalize">{user.app_metadata?.provider || 'Email'}</p>
        </div>
      </div>
    </Card>
  );
};