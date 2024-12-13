import { useState } from "react";
import { Invoice } from "@/types/invoice";
import InvoiceListHeader from "./invoice/InvoiceListHeader";
import InvoiceListItem from "./invoice/InvoiceListItem";
import { useInvoiceExport } from "./invoice/useInvoiceExport";

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
  onUpdateDetails: (id: string, details: Partial<Invoice['details']>) => Promise<void>;
}

const InvoiceList = ({ invoices, isLoading, onDelete, onUpdateDetails }: InvoiceListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Invoice['details']>>({});
  const { exportToCSV } = useInvoiceExport(invoices);

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

  return (
    <div className="space-y-4">
      <InvoiceListHeader onExportCSV={exportToCSV} />
      
      <div className="space-y-4">
        {invoices.map((invoice) => (
          <InvoiceListItem
            key={invoice.id}
            invoice={invoice}
            isLoading={isLoading}
            editingId={editingId}
            editForm={editForm}
            setEditForm={setEditForm}
            onEdit={handleEdit}
            onSave={handleSave}
            onDelete={onDelete}
            onCancelEdit={() => setEditingId(null)}
          />
        ))}
      </div>
    </div>
  );
};

export default InvoiceList;