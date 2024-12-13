import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const UpcomingPayments = () => {
  const { toast } = useToast();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: subscriptions, isLoading, error, refetch } = useQuery({
    queryKey: ['upcoming-payments'],
    queryFn: async () => {
      console.log("Fetching upcoming payments...");
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No user found");
        throw new Error("User not logged in");
      }

      const currentDate = new Date().toISOString();
      console.log("Current date for filter:", currentDate);

      const { data, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .gt('next_billing', currentDate)
        .order('next_billing', { ascending: true });

      if (fetchError) {
        console.error("Error fetching upcoming payments:", fetchError);
        throw fetchError;
      }

      console.log("Fetched upcoming payments:", data);
      return data || [];
    },
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
    retry: 3, // Retry failed requests 3 times
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    onError: (error) => {
      console.error("Query error:", error);
      toast({
        title: "Erreur de chargement",
        description: "Impossible de charger les paiements à venir. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  });

  const toggleDetails = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <p className="text-red-500">Une erreur est survenue lors de la récupération des paiements à venir.</p>
          <Button 
            onClick={() => refetch()} 
            variant="outline"
            className="mx-auto"
          >
            Réessayer
          </Button>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-gray-500 text-center">Aucun paiement à venir pour le moment.</p>
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
          <Card className="border border-gray-200 p-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-medium truncate">{sub.name}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    {format(parseISO(sub.next_billing), 'PPP', { locale: fr })}
                  </p>
                  <p className="text-sm text-gray-500">{sub.price} €</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto whitespace-nowrap"
                  onClick={() => toggleDetails(sub.id)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Voir les détails
                  {expandedId === sub.id ? (
                    <ChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </div>
              
              {expandedId === sub.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t pt-4 mt-2"
                >
                  <div className="space-y-2">
                    <p><span className="font-medium">Catégorie:</span> {sub.category || 'Non spécifiée'}</p>
                    <p><span className="font-medium">Description:</span> {sub.description || 'Aucune description'}</p>
                    <p><span className="font-medium">Date de création:</span> {format(parseISO(sub.created_at), 'PPP', { locale: fr })}</p>
                    {sub.is_trial && sub.trial_end_date && (
                      <p><span className="font-medium">Fin de la période d'essai:</span> {format(parseISO(sub.trial_end_date), 'PPP', { locale: fr })}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default UpcomingPayments;