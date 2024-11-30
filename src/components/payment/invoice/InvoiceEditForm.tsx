import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Loader2, Save, X } from "lucide-react";
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
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="text-sm font-medium">Montant</label>
        <Input
          type="number"
          value={editForm.amount || ''}
          onChange={(e) => setEditForm(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
          placeholder="Montant"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Catégorie</label>
        <Input
          value={editForm.category || ''}
          onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
          placeholder="Catégorie"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Date de facture</label>
        <Input
          type="date"
          value={editForm.invoice_date ? format(new Date(editForm.invoice_date), 'yyyy-MM-dd') : ''}
          onChange={(e) => setEditForm(prev => ({ ...prev, invoice_date: e.target.value }))}
        />
      </div>
      <div>
        <label className="text-sm font-medium">Marchand</label>
        <Input
          value={editForm.merchant_name || ''}
          onChange={(e) => setEditForm(prev => ({ ...prev, merchant_name: e.target.value }))}
          placeholder="Nom du marchand"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Statut</label>
        <Select
          value={editForm.status || 'pending'}
          onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}>
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
      <div className="col-span-2 flex justify-end gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onCancel}
          disabled={isLoading}
        >
          <X className="h-4 w-4 mr-1" />
          Annuler
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-1" />
          ) : (
            <Save className="h-4 w-4 mr-1" />
          )}
          Enregistrer
        </Button>
      </div>
    </div>
  );
};

export default InvoiceEditForm;