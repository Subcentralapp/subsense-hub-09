import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useInvoiceStore } from "@/services/invoice/invoiceStore";
import UpcomingPayments from "./payment/UpcomingPayments";
import InvoiceUploader from "./payment/InvoiceUploader";
import InvoiceList from "./payment/InvoiceList";
import PaymentCharts from "./payment/PaymentCharts";

const PaymentSection = () => {
  const { invoices, isLoading, addInvoice, removeInvoice, fetchInvoices, updateInvoiceDetails } = useInvoiceStore();

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <UpcomingPayments />
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