import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  description?: string;
}

interface SubscriptionEditDialogProps {
  subscription: Subscription | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubscriptionEditDialog = ({ subscription, onClose, onSuccess }: SubscriptionEditDialogProps) => {
  const { toast } = useToast();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subscription) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          name: subscription.name,
          price: subscription.price,
          category: subscription.category,
          next_billing: subscription.next_billing,
        })
        .eq('id', subscription.id);

      if (error) throw error;

      toast({
        title: "Abonnement modifié",
        description: "L'abonnement a été modifié avec succès",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!subscription} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'abonnement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleEdit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={subscription?.name || ''}
              onChange={(e) => subscription && onClose(prev => ({ ...subscription, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix mensuel (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={subscription?.price || ''}
              onChange={(e) => subscription && onClose(prev => ({ ...subscription, price: parseFloat(e.target.value) }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={subscription?.category || ''}
              onChange={(e) => subscription && onClose(prev => ({ ...subscription, category: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next_billing">Prochaine facturation</Label>
            <Input
              id="next_billing"
              type="date"
              value={subscription?.next_billing.split('T')[0] || ''}
              onChange={(e) => subscription && onClose(prev => ({ ...subscription, next_billing: e.target.value }))}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};