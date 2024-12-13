import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { format } from "date-fns";

interface InvoiceListHeaderProps {
  onExportCSV: () => void;
}

const InvoiceListHeader = ({ onExportCSV }: InvoiceListHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Liste des Factures</h3>
      <Button onClick={onExportCSV} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Exporter CSV
      </Button>
    </div>
  );
};

export default InvoiceListHeader;