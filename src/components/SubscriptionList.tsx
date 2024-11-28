import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, CreditCard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  user_id: string;
}

const SubscriptionList = () => {
  const { toast } = useToast();

  const { data: subscriptions, isLoading, refetch } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      console.log("Fetching subscriptions...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found, returning empty array");
        return [];
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }

      console.log("Fetched subscriptions:", data);
      return data as Subscription[];
    },
    refetchInterval: 1000, // Rafraîchit toutes les secondes
    refetchOnWindowFocus: true, // Rafraîchit quand la fenêtre reprend le focus
  });

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Abonnement supprimé",
        description: "L'abonnement a été supprimé avec succès",
      });

      refetch(); // Force le rafraîchissement après la suppression
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-white/5 backdrop-blur-lg border border-white/10">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/20 shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <CreditCard className="h-6 w-6 text-primary" />
        Mes Abonnements Actifs
      </h2>
      
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="group relative overflow-hidden p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{sub.category}</p>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">
                      {sub.price} €<span className="text-sm font-normal text-gray-500">/mois</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Prochain paiement: {new Date(sub.next_billing).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(sub.id)}
                      className="hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-neutral-light rounded-xl border border-gray-100">
            <p className="text-gray-500">
              Aucun abonnement actif pour le moment
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default SubscriptionList;