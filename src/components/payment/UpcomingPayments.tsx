import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const UpcomingPayments = () => {
  const { toast } = useToast();

  const { data: subscriptions, isLoading, error } = useQuery({
    queryKey: ['upcoming-payments'],
    queryFn: async () => {
      console.log("Fetching upcoming payments...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("User not logged in");
      }

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .gt('next_billing', new Date().toISOString())
        .order('next_billing', { ascending: true });

      if (fetchError) {
        console.error("Error fetching upcoming payments:", fetchError);
        toast({
          title: "Erreur",
          description: "Erreur lors de la récupération des paiements à venir.",
          variant: "destructive",
        });
        return [];
      }

      console.log("Fetched upcoming payments:", data);
      return data || [];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-red-500">Une erreur est survenue lors de la récupération des paiements à venir.</p>
      </Card>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-500">Aucun paiement à venir pour le moment.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Paiements à venir</h2>
      {subscriptions.map(sub => (
        <motion.div
          key={sub.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border border-gray-200 p-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{sub.name}</h3>
              <p className="text-sm text-gray-500">
                {format(parseISO(sub.next_billing), 'PPP', { locale: fr })}
              </p>
              <p className="text-sm text-gray-500">{sub.price} €</p>
            </div>
            <Button variant="outline" className="ml-4">
              <Calendar className="h-4 w-4 mr-2" />
              Payer Maintenant
            </Button>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingPayments;