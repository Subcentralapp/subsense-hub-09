import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export const UpcomingPayments = () => {
  const { toast } = useToast();

  const { data: upcomingPayments, isLoading } = useQuery({
    queryKey: ["upcomingPayments"],
    queryFn: async () => {
      console.log("Fetching upcoming payments...");
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .gte("next_billing", new Date().toISOString())
        .order("next_billing", { ascending: true })
        .limit(5);

      if (error) {
        console.error("Error fetching upcoming payments:", error);
        throw error;
      }

      console.log("Fetched upcoming payments:", data);
      return data || [];
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    meta: {
      errorHandler: (error: Error) => {
        console.error("Query error:", error);
        toast({
          title: "Erreur de chargement",
          description: "Impossible de charger les paiements à venir.",
          variant: "destructive",
        });
      }
    }
  });

  if (isLoading) {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Paiements à venir</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between items-center animate-pulse">
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (!upcomingPayments || upcomingPayments.length === 0) {
    return (
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Paiements à venir</h3>
        <p className="text-muted-foreground">Aucun paiement à venir</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Paiements à venir</h3>
      <div className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{payment.name}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(payment.next_billing), "d MMMM yyyy", { locale: fr })}
              </p>
            </div>
            <p className="font-semibold">{payment.price}€</p>
          </div>
        ))}
      </div>
    </Card>
  );
};