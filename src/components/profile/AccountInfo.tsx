import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Calendar } from "lucide-react";

interface AccountInfoProps {
  user: any;
}

export const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Mail className="h-5 w-5 mr-2" />
        Informations du compte
      </h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="mt-1">{user.email}</p>
        </div>
        <Separator />
        <div>
          <label className="text-sm font-medium text-muted-foreground">Date d'inscription</label>
          <p className="mt-1">{new Date(user.created_at).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</p>
        </div>
        <Separator />
        <div>
          <label className="text-sm font-medium text-muted-foreground">ID Utilisateur</label>
          <p className="mt-1 font-mono text-sm">{user.id}</p>
        </div>
      </div>
    </Card>
  );
};