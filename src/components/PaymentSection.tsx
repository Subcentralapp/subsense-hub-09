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
    console.log("PaymentSection - Fetching invoices...");
    const loadInvoices = async () => {
      try {
        await fetchInvoices();
        console.log("PaymentSection - Invoices fetched successfully");
      } catch (error) {
        console.error("PaymentSection - Error fetching invoices:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les factures. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    };

    loadInvoices();
  }, [fetchInvoices, toast]);

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