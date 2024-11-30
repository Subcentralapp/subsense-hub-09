import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Save, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InvoiceEditFormProps {
  editForm: any;
  setEditForm: (form: any) => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
  isLoading: boolean;
}

const InvoiceEditForm = ({ editForm, setEditForm, onSave, onCancel, isLoading }: InvoiceEditFormProps) => {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      await onSave();
      toast({
        title: "Modifications enregistrées",
        description: "Les détails de la facture ont été mis à jour avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Montant (€)</label>
          <Input
            type="number"
            value={editForm.amount || ''}
            onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
            placeholder="0.00"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Date de facture</label>
          <Input
            type="date"
            value={editForm.invoice_date || ''}
            onChange={(e) => setEditForm({ ...editForm, invoice_date: e.target.value })}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Marchand</label>
          <Input
            value={editForm.merchant_name || ''}
            onChange={(e) => setEditForm({ ...editForm, merchant_name: e.target.value })}
            placeholder="Nom du marchand"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Statut</label>
          <Select
            value={editForm.status || 'pending'}
            onValueChange={(value) => setEditForm({ ...editForm, status: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="paid">Payée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-1" />
          Annuler
        </Button>
        <Button
          variant="default"
          onClick={handleSave}
          disabled={isLoading}
        >
          <Save className="h-4 w-4 mr-1" />
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default InvoiceEditForm;