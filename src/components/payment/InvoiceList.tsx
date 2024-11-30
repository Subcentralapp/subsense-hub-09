import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableBody } from "@/components/ui/table";
import InvoiceFilters from "./invoice/InvoiceFilters";
import InvoiceExport from "./invoice/InvoiceExport";
import { useInvoiceDetails } from "@/hooks/useInvoiceDetails";
import { updateInvoiceDetails } from "@/services/invoiceOperations";
import InvoiceTableHeader from "./invoice/InvoiceTableHeader";
import InvoiceTableRow from "./invoice/InvoiceTableRow";

interface Invoice {
  id: string;
  name: string;
  date: Date;
  url: string;
}

interface InvoiceListProps {
  invoices: Invoice[];
  isLoading: boolean;
  onDelete: (id: string) => Promise<void>;
}

const InvoiceList = ({ invoices, isLoading, onDelete }: InvoiceListProps) => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"date" | "name" | "price" | "status">("date");
  const [editForm, setEditForm] = useState({
    price: "",
    date: "",
    status: "pending",
    merchantName: "",
  });

  const { data: invoiceDetails = [], isError: isDetailsError } = useInvoiceDetails();

  const handleEdit = async (invoiceId: string) => {
    if (editingId === invoiceId) {
      try {
        await updateInvoiceDetails(invoiceId, {
          amount: parseFloat(editForm.price),
          invoice_date: editForm.date,
          status: editForm.status,
          merchant_name: editForm.merchantName,
        });

        toast({
          title: "Modifications enregistrées",
          description: "Les informations de la facture ont été mises à jour.",
        });

        setEditingId(null);
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la mise à jour.",
          variant: "destructive",
        });
      }
    } else {
      const invoiceDetail = invoiceDetails
        .filter(d => d.invoice_id === parseInt(invoiceId))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

      setEditForm({
        price: invoiceDetail?.amount?.toString() || "",
        date: invoiceDetail?.invoice_date?.toString() || "",
        status: invoiceDetail?.status || "pending",
        merchantName: invoiceDetail?.merchant_name || "",
      });
      setEditingId(invoiceId);
    }
  };

  const filteredInvoices = invoices
    .filter(invoice => invoice.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const detailsA = invoiceDetails
        .filter(d => d.invoice_id === parseInt(a.id))
        .sort((x, y) => new Date(y.created_at).getTime() - new Date(x.created_at).getTime())[0];
      const detailsB = invoiceDetails
        .filter(d => d.invoice_id === parseInt(b.id))
        .sort((x, y) => new Date(y.created_at).getTime() - new Date(x.created_at).getTime())[0];

      switch (sortBy) {
        case "date":
          return new Date(detailsB?.invoice_date || b.date).getTime() - 
                 new Date(detailsA?.invoice_date || a.date).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return (detailsB?.amount || 0) - (detailsA?.amount || 0);
        case "status":
          return (detailsA?.status || "pending").localeCompare(detailsB?.status || "pending");
        default:
          return 0;
      }
    });

  if (isDetailsError) {
    toast({
      title: "Erreur",
      description: "Impossible de charger les détails des factures.",
      variant: "destructive",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Factures enregistrées</h3>
        <InvoiceExport invoices={invoices} invoiceDetails={invoiceDetails} />
      </div>
      
      <InvoiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <InvoiceTableHeader />
          <TableBody>
            {filteredInvoices.map((invoice) => {
              const invoiceDetail = invoiceDetails
                .filter(d => d.invoice_id === parseInt(invoice.id))
                .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0] || {
                  status: 'pending',
                  amount: null,
                  invoice_date: invoice.date,
                  merchant_name: ''
                };
              
              return (
                <InvoiceTableRow
                  key={invoice.id}
                  invoice={invoice}
                  invoiceDetail={invoiceDetail}
                  isEditing={editingId === invoice.id}
                  isLoading={isLoading}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  onEdit={() => handleEdit(invoice.id)}
                  onDelete={() => onDelete(invoice.id)}
                />
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceList;