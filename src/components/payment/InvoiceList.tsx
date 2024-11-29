import { Button } from "@/components/ui/button";
import { FileText, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import InvoiceMetadata from "./invoice/InvoiceMetadata";
import InvoiceActions from "./invoice/InvoiceActions";

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
  const [sortBy, setSortBy] = useState<"date" | "name" | "price">("date");
  const [editForm, setEditForm] = useState({
    price: "",
    date: "",
  });

  const { data: invoiceDetails, refetch } = useQuery({
    queryKey: ['invoiceDetails'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('InvoiceDetails')
        .select('*');
      
      if (error) throw error;
      return data;
    }
  });

  const handleEdit = async (invoiceId: string) => {
    if (editingId === invoiceId) {
      try {
        const { error } = await supabase
          .from('InvoiceDetails')
          .update({
            amount: parseFloat(editForm.price),
            invoice_date: editForm.date,
          })
          .eq('invoice_id', invoiceId);

        if (error) throw error;

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

  // Filter and sort invoices
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
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Factures enregistrées</h3>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Rechercher une facture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "name" | "price")}
          className="border rounded-md p-2"
        >
          <option value="date">Trier par date</option>
          <option value="name">Trier par nom</option>
          <option value="price">Trier par prix</option>
        </select>
      </div>

      <div className="grid gap-4">
        {filteredInvoices.map((invoice) => {
          const invoiceDetail = invoiceDetails?.find(d => d.invoice_id === invoice.id);
          const isEditing = editingId === invoice.id;
          
          return (
            <div
              key={invoice.id}
              className="bg-white rounded-lg shadow p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <a 
                      href={invoice.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      {invoice.name}
                    </a>
                  </div>
                </div>
                <InvoiceActions
                  isEditing={isEditing}
                  isLoading={isLoading}
                  onEdit={() => handleEdit(invoice.id)}
                  onDelete={() => handleDelete(invoice.id)}
                />
              </div>
              
              <InvoiceMetadata
                isEditing={isEditing}
                metadata={invoiceDetail}
                editForm={editForm}
                setEditForm={setEditForm}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvoiceList;