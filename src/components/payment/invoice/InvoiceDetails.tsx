import { format } from "date-fns";

interface InvoiceDetailsProps {
  details: {
    amount?: number;
    category?: string;
    invoice_date?: string;
    merchant_name?: string;
    status?: string;
  };
}

const InvoiceDetails = ({ details }: InvoiceDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="font-medium">Montant:</span>{' '}
        {details?.amount ? `${details.amount}€` : 'Non défini'}
      </div>
      <div>
        <span className="font-medium">Catégorie:</span>{' '}
        {details?.category || 'Non définie'}
      </div>
      <div>
        <span className="font-medium">Date de facture:</span>{' '}
        {details?.invoice_date
          ? format(new Date(details.invoice_date), 'dd/MM/yyyy')
          : 'Non définie'}
      </div>
      <div>
        <span className="font-medium">Marchand:</span>{' '}
        {details?.merchant_name || 'Non défini'}
      </div>
      <div>
        <span className="font-medium">Statut:</span>{' '}
        {details?.status === 'pending' && 'En attente'}
        {details?.status === 'paid' && 'Payée'}
        {details?.status === 'cancelled' && 'Annulée'}
      </div>
    </div>
  );
};

export default InvoiceDetails;