import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Application } from "@/types/application";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { addDays } from "date-fns";

interface SubscriptionCustomizeDialogProps {
  app: Application | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (price: number, nextBilling: Date, isTrial: boolean, trialEndDate: Date | null) => void;
}

const SubscriptionCustomizeDialog = ({ app, isOpen, onClose, onConfirm }: SubscriptionCustomizeDialogProps) => {
  const [price, setPrice] = useState(app?.price || 0);
  const [nextBilling, setNextBilling] = useState(new Date());
  const [isTrial, setIsTrial] = useState(false);
  const [trialDays, setTrialDays] = useState(14); // Par défaut 14 jours d'essai

  const handleConfirm = () => {
    const trialEndDate = isTrial ? addDays(new Date(), trialDays) : null;
    onConfirm(price, nextBilling, isTrial, trialEndDate);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personnaliser l'abonnement à {app?.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="price">Prix mensuel (€)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="next-billing">Prochain paiement</Label>
            <Input
              id="next-billing"
              type="date"
              value={nextBilling.toISOString().split('T')[0]}
              onChange={(e) => setNextBilling(new Date(e.target.value))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="trial">Période d'essai</Label>
            <Switch
              id="trial"
              checked={isTrial}
              onCheckedChange={setIsTrial}
            />
          </div>

          {isTrial && (
            <div className="grid gap-2">
              <Label htmlFor="trial-days">Durée de l'essai (jours)</Label>
              <Input
                id="trial-days"
                type="number"
                min="1"
                max="90"
                value={trialDays}
                onChange={(e) => setTrialDays(parseInt(e.target.value))}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleConfirm}>
            Confirmer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionCustomizeDialog;