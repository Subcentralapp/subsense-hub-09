import { Button } from "@/components/ui/button";
import { FileText, Trash2, Loader2, DollarSign, Calendar, PenLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { Input } from "@/components/ui/input";

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
  const [editForm, setEditForm] = useState({
    price: "",
    date: "",
  });

  const { data: metadata, refetch } = useQuery({
    queryKey: ['metadata'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Métadonné')
        .select('*')
      
      if (error) throw error;
      return data;
    }
  });

  const handleEdit = async (invoiceId: string) => {
    if (editingId === invoiceId) {
      try {
        const { error } = await supabase
          .from('Métadonné')
          .update({
            Price: parseFloat(editForm.price),
            date: editForm.date,
          })
          .eq('Name', invoiceId);

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
      const invoiceMetadata = metadata?.find(m => m.Name === invoiceId);
      setEditForm({
        price: invoiceMetadata?.Price?.toString() || "",
        date: invoiceMetadata?.date?.toString() || "",
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

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-lg">Factures enregistrées</h3>
      <div className="grid gap-4">
        {invoices.map((invoice) => {
          const invoiceMetadata = metadata?.find(m => m.Name === invoice.id);
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
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(invoice.id)}
                  >
                    {isEditing ? (
                      "Sauvegarder"
                    ) : (
                      <>
                        <PenLine className="h-4 w-4 mr-1" />
                        Modifier
                      </>
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(invoice.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
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
                      {invoiceMetadata?.Price ? `${invoiceMetadata.Price} €` : 'Prix non défini'}
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
                      {invoiceMetadata?.date 
                        ? new Date(invoiceMetadata.date).toLocaleDateString()
                        : 'Date non définie'
                      }
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvoiceList;