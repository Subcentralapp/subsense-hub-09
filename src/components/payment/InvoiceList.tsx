import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download, Pencil, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import InvoiceEditForm from "./invoice/InvoiceEditForm";
import InvoiceDetails from "./invoice/InvoiceDetails";

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

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
  onUpdateDetails: (id: string, details: Partial<Invoice['details']>) => Promise<void>;
}

const InvoiceList = ({ invoices, isLoading, onDelete, onUpdateDetails }: InvoiceListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Invoice['details']>>({});

  const handleEdit = (invoice: Invoice) => {
    setEditingId(invoice.id);
    setEditForm(invoice.details || {});
  };

  const handleSave = async (id: string) => {
    try {
      await onUpdateDetails(id, editForm);
      setEditingId(null);
      setEditForm({});
    } catch (error) {
      console.error('Error saving invoice details:', error);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nom', 'Date', 'Montant', 'Catégorie', 'Date de facture', 'Marchand', 'Statut'];
    const data = invoices.map(inv => [
      inv.name,
      format(new Date(inv.date), 'dd/MM/yyyy'),
      inv.details?.amount || '',
      inv.details?.category || '',
      inv.details?.invoice_date ? format(new Date(inv.details.invoice_date), 'dd/MM/yyyy') : '',
      inv.details?.merchant_name || '',
      inv.details?.status || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `factures_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Liste des Factures</h3>
        <Button onClick={exportToCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Exporter CSV
        </Button>
      </div>
      
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="border rounded-lg p-4 space-y-4">
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
                    onClick={() => setEditingId(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(invoice)}
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
                onSave={() => handleSave(invoice.id)}
                onCancel={() => setEditingId(null)}
                isLoading={isLoading}
              />
            ) : (
              <InvoiceDetails details={invoice.details} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;