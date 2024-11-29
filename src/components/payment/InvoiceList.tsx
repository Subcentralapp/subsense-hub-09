import { useState } from "react";
import { FileText, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InvoiceMetadata from "./invoice/InvoiceMetadata";
import InvoiceActions from "./invoice/InvoiceActions";
import InvoiceFilters from "./invoice/InvoiceFilters";
import { useInvoiceDetails } from "@/hooks/useInvoiceDetails";
import { updateInvoiceDetails } from "@/services/invoiceOperations";

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
  });

  const { data: invoiceDetails, refetch } = useInvoiceDetails();

  const handleEdit = async (invoiceId: string) => {
    if (editingId === invoiceId) {
      try {
        await updateInvoiceDetails(invoiceId, {
          amount: parseFloat(editForm.price),
          invoice_date: editForm.date,
        });

        toast({
          title: "Modifications enregistrées",
          description: "Les informations de la facture ont été mises à jour.",
        });

        setEditingId(null);
        refetch();
      } catch (error) {
        console.error("Erreur lors de la mise à jour:", error);
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de la mise à jour.",
          variant: "destructive",
        });
      }
    } else {
      const invoiceDetail = invoiceDetails?.find(d => d.invoice_id === invoiceId);
      setEditForm({
        price: invoiceDetail?.amount?.toString() || "",
        date: invoiceDetail?.invoice_date?.toString() || "",
      });
      setEditingId(invoiceId);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
      toast({
        title: "Facture supprimée",
        description: "La facture a été supprimée avec succès.",
      });
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'overdue':
        return 'En retard';
      default:
        return 'En attente';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const filteredInvoices = invoices
    .filter(invoice => invoice.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const detailsA = invoiceDetails?.find(d => d.invoice_id === a.id);
      const detailsB = invoiceDetails?.find(d => d.invoice_id === b.id);

      switch (sortBy) {
        case "date":
          return new Date(detailsB?.invoice_date || 0).getTime() - 
                 new Date(detailsA?.invoice_date || 0).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return (detailsB?.amount || 0) - (detailsA?.amount || 0);
        case "status":
          return (detailsA?.status || "").localeCompare(detailsB?.status || "");
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Factures enregistrées</h3>
      
      <InvoiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Statut</TableHead>
              <TableHead>Facture</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Montant</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => {
              const invoiceDetail = invoiceDetails?.find(d => d.invoice_id === invoice.id);
              const isEditing = editingId === invoice.id;
              
              return (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(invoiceDetail?.status || 'pending')}
                      <span className={`text-sm px-2.5 py-0.5 rounded-full border ${getStatusClass(invoiceDetail?.status || 'pending')}`}>
                        {getStatusText(invoiceDetail?.status || 'pending')}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <a 
                        href={invoice.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:underline"
                      >
                        {invoice.name}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>
                    {invoiceDetail?.invoice_date 
                      ? new Date(invoiceDetail.invoice_date).toLocaleDateString()
                      : '-'
                    }
                  </TableCell>
                  <TableCell>
                    {invoiceDetail?.amount 
                      ? `${invoiceDetail.amount} €`
                      : '-'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <InvoiceActions
                      isEditing={isEditing}
                      isLoading={isLoading}
                      onEdit={() => handleEdit(invoice.id)}
                      onDelete={() => handleDelete(invoice.id)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default InvoiceList;