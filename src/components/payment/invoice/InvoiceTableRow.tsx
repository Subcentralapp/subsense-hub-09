import { TableCell, TableRow } from "@/components/ui/table";
import { FileText } from "lucide-react";
import InvoiceStatusCell from "./InvoiceStatusCell";
import InvoiceActions from "./InvoiceActions";
import InvoiceEditForm from "./InvoiceEditForm";

interface InvoiceTableRowProps {
  invoice: any;
  invoiceDetail: any;
  isEditing: boolean;
  isLoading: boolean;
  editForm: any;
  setEditForm: (form: any) => void;
  onEdit: () => void;
  onDelete: () => void;
  onSave: () => Promise<void>;
  onCancel: () => void;
}

const InvoiceTableRow = ({
  invoice,
  invoiceDetail,
  isEditing,
  isLoading,
  editForm,
  setEditForm,
  onEdit,
  onDelete,
  onSave,
  onCancel,
}: InvoiceTableRowProps) => {
  return (
    <TableRow className="hover:bg-gray-50">
      <InvoiceStatusCell status={invoiceDetail.status} />
      <TableCell>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <a 
            href={invoice.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium hover:underline"
          >
            {invoice.name}
          </a>
        </div>
      </TableCell>
      <TableCell>
        {isEditing ? (
          <div className="w-40">
            <InvoiceEditForm 
              editForm={editForm} 
              setEditForm={setEditForm}
              onSave={onSave}
              onCancel={onCancel}
              isLoading={isLoading}
            />
          </div>
        ) : (
          <>
            {invoiceDetail.invoice_date 
              ? new Date(invoiceDetail.invoice_date).toLocaleDateString()
              : new Date(invoice.date).toLocaleDateString()
            }
          </>
        )}
      </TableCell>
      <TableCell>
        {!isEditing && (invoiceDetail.amount 
          ? `${invoiceDetail.amount} €`
          : '-'
        )}
      </TableCell>
      <TableCell>
        {!isEditing && (invoiceDetail.merchant_name || '-')}
      </TableCell>
      <TableCell className="text-right">
        <InvoiceActions
          isEditing={isEditing}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;