import { Button } from "@/components/ui/button";
import { FileText, Trash2, Loader2, Tag, DollarSign, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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

  const { data: metadata } = useQuery({
    queryKey: ['metadata'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('Métadonné')
        .select('*')
      
      if (error) throw error;
      return data;
    }
  });

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
    <div className="space-y-2">
      <h3 className="font-medium text-lg">Factures enregistrées</h3>
      {invoices.map((invoice) => {
        const invoiceMetadata = metadata?.find(m => m.Name === invoice.id);
        
        return (
          <div
            key={invoice.id}
            className="bg-primary/10 p-4 rounded-lg space-y-3"
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
                  <p className="text-xs text-gray-500">
                    {invoice.date.toLocaleDateString()}
                  </p>
                </div>
              </div>
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
            
            {invoiceMetadata && (
              <div className="bg-white/50 p-3 rounded-md space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="font-medium">
                    {invoiceMetadata.Price ? `${invoiceMetadata.Price} €` : 'Montant non détecté'}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>
                    {invoiceMetadata.date 
                      ? new Date(invoiceMetadata.date).toLocaleDateString()
                      : 'Date non détectée'
                    }
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default InvoiceList;