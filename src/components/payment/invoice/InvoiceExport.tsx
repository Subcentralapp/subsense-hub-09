import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface InvoiceExportProps {
  invoices: any[];
  invoiceDetails: any[];
}

const InvoiceExport = ({ invoices, invoiceDetails }: InvoiceExportProps) => {
  const exportToCSV = () => {
    // Prepare data
    const data = invoices.map(invoice => {
      const details = invoiceDetails
        .filter(d => d.invoice_id === parseInt(invoice.id))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];

      return {
        'Nom du fichier': invoice.name,
        'Date': details?.invoice_date ? new Date(details.invoice_date).toLocaleDateString() : new Date(invoice.date).toLocaleDateString(),
        'Montant': details?.amount || '',
        'Statut': details?.status || 'pending',
        'Marchand': details?.merchant_name || '',
        'URL': invoice.url
      };
    });

    // Convert to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'factures.csv';
    link.click();
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={exportToCSV}
      className="ml-auto"
    >
      <Download className="h-4 w-4 mr-2" />
      Exporter en CSV
    </Button>
  );
};

export default InvoiceExport;