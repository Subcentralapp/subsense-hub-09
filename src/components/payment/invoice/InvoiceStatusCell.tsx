import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { TableCell } from "@/components/ui/table";

interface InvoiceStatusCellProps {
  status: string;
}

const InvoiceStatusCell = ({ status }: InvoiceStatusCellProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Payée';
      case 'pending':
        return 'En attente';
      case 'overdue':
        return 'En retard';
      default:
        return 'En attente';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'overdue':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        {getStatusIcon(status)}
        <span className={`text-sm px-2.5 py-0.5 rounded-full border ${getStatusClass(status)}`}>
          {getStatusText(status)}
        </span>
      </div>
    </TableCell>
  );
};

export default InvoiceStatusCell;