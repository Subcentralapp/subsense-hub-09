import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useInvoiceStore } from "@/services/invoice/invoiceStore";
import { UpcomingPayments } from "./payment/UpcomingPayments";
import InvoiceUploader from "./payment/InvoiceUploader";
import InvoiceList from "./payment/InvoiceList";
import PaymentCharts from "./payment/PaymentCharts";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PaymentSection = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { invoices, isLoading, addInvoice, removeInvoice, fetchInvoices, updateInvoiceDetails } = useInvoiceStore();

  useEffect(() => {
    const checkSessionAndFetchData = async () => {
      try {
        console.log("PaymentSection - Vérification de la session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("PaymentSection - Erreur de session:", sessionError);
          throw sessionError;
        }

        if (!session) {
          console.log("PaymentSection - Pas de session active, redirection...");
          navigate("/identification");
          return;
        }

        console.log("PaymentSection - Session valide, chargement des données...");
        await fetchInvoices();
      } catch (error) {
        console.error("PaymentSection - Erreur:", error);
        toast({
          title: "Erreur de connexion",
          description: "Votre session a expiré. Veuillez vous reconnecter.",
          variant: "destructive",
        });
        navigate("/identification");
      }
    };

    checkSessionAndFetchData();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("PaymentSection - Changement d'état d'authentification:", event);
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/identification");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, fetchInvoices]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        </Card>
      </div>
    );
  }

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