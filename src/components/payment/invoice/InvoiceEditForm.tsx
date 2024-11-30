import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceEditFormProps {
  editForm: {
    price: string;
    date: string;
    status: string;
    merchantName: string;
  };
  setEditForm: (form: any) => void;
}

const InvoiceEditForm = ({ editForm, setEditForm }: InvoiceEditFormProps) => {
  return (
    <div className="space-y-2">
      <Input
        type="number"
        value={editForm.price}
        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
        placeholder="Montant"
        className="h-8"
      />
      <Input
        type="date"
        value={editForm.date}
        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
        className="h-8"
      />
      <Input
        type="text"
        value={editForm.merchantName}
        onChange={(e) => setEditForm({ ...editForm, merchantName: e.target.value })}
        placeholder="Nom du marchand"
        className="h-8"
      />
      <Select 
        value={editForm.status} 
        onValueChange={(value) => setEditForm({ ...editForm, status: value })}
      >
        <SelectTrigger className="h-8">
          <SelectValue placeholder="Statut" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">En attente</SelectItem>
          <SelectItem value="paid">Payée</SelectItem>
          <SelectItem value="overdue">En retard</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InvoiceEditForm;