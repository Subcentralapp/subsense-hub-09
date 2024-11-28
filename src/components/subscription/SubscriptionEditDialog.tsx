import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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
  const [formData, setFormData] = useState<Partial<Subscription>>(subscription || {});
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscription?.id) return;

    try {
      setIsLoading(true);
      const { error } = await supabase
        .from('subscriptions')
        .update({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          next_billing: formData.next_billing,
          description: formData.description
        })
        .eq('id', subscription.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "L'abonnement a été mis à jour"
      });
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={!!subscription} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'abonnement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={formData.category || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next_billing">Prochaine facturation</Label>
            <Input
              id="next_billing"
              type="date"
              value={formData.next_billing ? new Date(formData.next_billing).toISOString().split('T')[0] : ""}
              onChange={(e) => setFormData(prev => ({ ...prev, next_billing: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};