import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubscriptionCard } from "./subscription/SubscriptionCard";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  description?: string;
}

const SubscriptionList = () => {
  const { toast } = useToast();
  const [editingSubscription, setEditingSubscription] = useState<Subscription | null>(null);

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
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
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

      refetch();
    } catch (error) {
      console.error("Error deleting subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingSubscription) return;

    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          name: editingSubscription.name,
          price: editingSubscription.price,
          category: editingSubscription.category,
          next_billing: editingSubscription.next_billing,
        })
        .eq('id', editingSubscription.id);

      if (error) throw error;

      toast({
        title: "Abonnement modifié",
        description: "L'abonnement a été modifié avec succès",
      });

      setEditingSubscription(null);
      refetch();
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la modification",
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
    <>
      <Card className="p-6 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-md border border-white/20 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" />
          Mes Abonnements Actifs
        </h2>
        
        {subscriptions && subscriptions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={setEditingSubscription}
                onDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-neutral-light rounded-xl border border-gray-100">
            <p className="text-gray-500">
              Aucun abonnement actif pour le moment
            </p>
          </div>
        )}
      </Card>

      <Dialog open={!!editingSubscription} onOpenChange={() => setEditingSubscription(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l'abonnement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={editingSubscription?.name || ''}
                onChange={(e) => setEditingSubscription(prev => prev ? {...prev, name: e.target.value} : null)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Prix mensuel (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={editingSubscription?.price || ''}
                onChange={(e) => setEditingSubscription(prev => prev ? {...prev, price: parseFloat(e.target.value)} : null)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Catégorie</Label>
              <Input
                id="category"
                value={editingSubscription?.category || ''}
                onChange={(e) => setEditingSubscription(prev => prev ? {...prev, category: e.target.value} : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="next_billing">Prochaine facturation</Label>
              <Input
                id="next_billing"
                type="date"
                value={editingSubscription?.next_billing.split('T')[0] || ''}
                onChange={(e) => setEditingSubscription(prev => prev ? {...prev, next_billing: e.target.value} : null)}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setEditingSubscription(null)}>
                Annuler
              </Button>
              <Button type="submit">
                Enregistrer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubscriptionList;