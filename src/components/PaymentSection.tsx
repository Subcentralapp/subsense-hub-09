import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Calendar, FileText, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useInvoiceStore } from "@/services/invoiceService";

const PaymentSection = () => {
  const { toast } = useToast();
  const { invoices, isLoading, addInvoice, removeInvoice, fetchInvoices } = useInvoiceStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive",
      });
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier PDF valide.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addInvoice(selectedFile);
      setSelectedFile(null);
      toast({
        title: "Succès",
        description: `${selectedFile.name} a été ajouté avec succès.`,
      });
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'upload du fichier.",
        variant: "destructive",
      });
    }
  };

  const upcomingPayments = [
    { id: 1, service: "Netflix", amount: 17.99, date: "2024-02-15" },
    { id: 2, service: "Spotify", amount: 9.99, date: "2024-02-20" },
    { id: 3, service: "Amazon Prime", amount: 6.99, date: "2024-02-25" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-4">Paiements à venir</h2>
        <div className="space-y-4">
          {upcomingPayments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover-scale"
            >
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{payment.service}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="font-semibold">{payment.amount} €</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-4">Gestion des Factures</h2>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <FileText className="h-10 w-10 text-gray-400" />
              <div>
                <p className="text-lg font-medium">Déposez votre facture ici</p>
                <p className="text-sm text-gray-500">Format accepté : PDF</p>
              </div>
              <div className="flex flex-col gap-2">
                <Input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleUpload} 
                  disabled={isLoading || !selectedFile}
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  {selectedFile ? "Uploader le fichier" : "Sélectionner un fichier"}
                </Button>
              </div>
            </div>
          </div>

          {invoices.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Factures enregistrées</h3>
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="bg-primary/10 p-3 rounded-lg flex items-center justify-between"
                >
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
                    onClick={() => {
                      removeInvoice(invoice.id);
                      toast({
                        title: "Facture supprimée",
                        description: "La facture a été supprimée avec succès.",
                      });
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentSection;