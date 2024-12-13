import { Button } from "@/components/ui/button";
import { FileText, Pencil, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import InvoiceEditForm from "./InvoiceEditForm";
import InvoiceDetails from "./InvoiceDetails";

interface Invoice {
  id: string;
  name: string;
  date: Date;
  url: string;
  details?: {
    amount: number;
    category: string;
    invoice_date: string;
    merchant_name: string;
    status: string;
  };
}

interface InvoiceListItemProps {
  invoice: Invoice;
  isLoading: boolean;
  editingId: string | null;
  editForm: any;
  setEditForm: (form: any) => void;
  onEdit: (invoice: Invoice) => void;
  onSave: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCancelEdit: () => void;
}

const InvoiceListItem = ({
  invoice,
  isLoading,
  editingId,
  editForm,
  setEditForm,
  onEdit,
  onSave,
  onDelete,
  onCancelEdit
}: InvoiceListItemProps) => {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <FileText className="h-8 w-8 text-gray-400" />
          <div>
            <h4 className="font-medium">{invoice.name}</h4>
            <p className="text-sm text-gray-500">
              Ajouté le {format(new Date(invoice.date), 'dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {editingId === invoice.id ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={onCancelEdit}
            >
              <X className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(invoice)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(invoice.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <X className="h-4 w-4" />
                )}
              </Button>
            </>
          )}
        </div>
      </div>

      {editingId === invoice.id ? (
        <InvoiceEditForm
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={() => onSave(invoice.id)}
          onCancel={onCancelEdit}
          isLoading={isLoading}
        />
      ) : (
        <InvoiceDetails details={invoice.details} />
      )}
    </div>
  );
};

export default InvoiceListItem;