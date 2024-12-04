import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSubscriptionEdit } from "./hooks/useSubscriptionEdit";
import { Subscription } from "@/types/subscription";

interface SubscriptionEditDialogProps {
  subscription: Subscription | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubscriptionEditDialog = ({ subscription, onClose, onSuccess }: SubscriptionEditDialogProps) => {
  const { formData, setFormData, isLoading, handleSubmit } = useSubscriptionEdit(
    subscription,
    onSuccess,
    onClose
  );

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