import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useInvoiceStore } from "@/services/invoiceService";
import UpcomingPayments from "./payment/UpcomingPayments";
import InvoiceUploader from "./payment/InvoiceUploader";
import InvoiceList from "./payment/InvoiceList";

const PaymentSection = () => {
  const { invoices, isLoading, addInvoice, removeInvoice, fetchInvoices } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div className="space-y-6">
      <UpcomingPayments />
      
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-4">Gestion des Factures</h2>
        <div className="space-y-4">
          <InvoiceUploader isLoading={isLoading} onUpload={addInvoice} />
          {invoices.length > 0 && (
            <InvoiceList 
              invoices={invoices}
              isLoading={isLoading}
              onDelete={removeInvoice}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaymentSection;