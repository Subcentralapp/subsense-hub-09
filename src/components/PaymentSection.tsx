import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useInvoiceStore } from "@/services/invoice/invoiceStore";
import { UpcomingPayments } from "./payment/UpcomingPayments";
import InvoiceUploader from "./payment/InvoiceUploader";
import InvoiceList from "./payment/InvoiceList";
import PaymentCharts from "./payment/PaymentCharts";
import { useToast } from "@/components/ui/use-toast";

const PaymentSection = () => {
  const { toast } = useToast();
  const { invoices, isLoading, addInvoice, removeInvoice, fetchInvoices, updateInvoiceDetails } = useInvoiceStore();

  useEffect(() => {
    console.log("PaymentSection - Initializing...");
    fetchInvoices().catch((error) => {
      console.error("PaymentSection - Error fetching invoices:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les factures. Veuillez réessayer.",
        variant: "destructive",
      });
    });
  }, [fetchInvoices, toast]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <UpcomingPayments key="upcoming-payments" />
      </Card>
      
      <PaymentCharts />
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Gestion des Factures</h2>
        <div className="space-y-4">
          <InvoiceUploader isLoading={isLoading} onUpload={addInvoice} />
          {invoices.length > 0 && (
            <InvoiceList 
              invoices={invoices}
              isLoading={isLoading}
              onDelete={removeInvoice}
              onUpdateDetails={updateInvoiceDetails}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentSection;