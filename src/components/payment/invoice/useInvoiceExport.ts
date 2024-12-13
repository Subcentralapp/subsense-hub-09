import { format } from "date-fns";
import { Invoice } from "@/types/invoice";

export const useInvoiceExport = (invoices: Invoice[]) => {
  const exportToCSV = () => {
    const headers = ['Nom', 'Date', 'Montant', 'Catégorie', 'Date de facture', 'Marchand', 'Statut'];
    const data = invoices.map(inv => [
      inv.name,
      format(new Date(inv.date), 'dd/MM/yyyy'),
      inv.details?.amount || '',
      inv.details?.category || '',
      inv.details?.invoice_date ? format(new Date(inv.details.invoice_date), 'dd/MM/yyyy') : '',
      inv.details?.merchant_name || '',
      inv.details?.status || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...data.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `factures_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
  };

  return { exportToCSV };
};