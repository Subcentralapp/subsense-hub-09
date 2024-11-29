import { DollarSign, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InvoiceMetadataProps {
  isEditing: boolean;
  metadata: any;
  editForm: {
    price: string;
    date: string;
  };
  setEditForm: (form: any) => void;
}

const InvoiceMetadata = ({ isEditing, metadata, editForm, setEditForm }: InvoiceMetadataProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-3">
      <div className="flex items-center gap-2">
        <DollarSign className="h-4 w-4 text-primary shrink-0" />
        {isEditing ? (
          <Input
            type="number"
            value={editForm.price}
            onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
            placeholder="Prix"
            className="h-8"
          />
        ) : (
          <span className="text-sm">
            {metadata?.amount ? `${metadata.amount} €` : 'Prix non défini'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-primary shrink-0" />
        {isEditing ? (
          <Input
            type="date"
            value={editForm.date}
            onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
            className="h-8"
          />
        ) : (
          <span className="text-sm">
            {metadata?.invoice_date 
              ? new Date(metadata.invoice_date).toLocaleDateString()
              : 'Date non définie'
            }
          </span>
        )}
      </div>
    </div>
  );
};

export default InvoiceMetadata;