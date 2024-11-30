import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const InvoiceTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Statut</TableHead>
        <TableHead>Facture</TableHead>
        <TableHead>Date</TableHead>
        <TableHead>Montant</TableHead>
        <TableHead>Marchand</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default InvoiceTableHeader;