import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pencil, Trash2, CreditCard } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

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

  const calculateDaysProgress = (nextBilling: string): number => {
    const now = new Date();
    const nextDate = new Date(nextBilling);
    const lastMonth = new Date(nextDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const totalDays = (nextDate.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24);
    const daysLeft = (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

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
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="group relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{sub.name}</h3>
                    <p className="text-sm text-gray-500">{sub.category}</p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-primary">
                      {sub.price} €<span className="text-sm font-normal text-gray-500">/mois</span>
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">
                        Prochain paiement: {new Date(sub.next_billing).toLocaleDateString()}
                      </p>
                      <div className="space-y-1">
                        <Progress value={calculateDaysProgress(sub.next_billing)} className="h-2" />
                        <p className="text-xs text-gray-500 text-right">
                          {Math.ceil((new Date(sub.next_billing).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} jours restants
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setEditingSubscription(sub)}
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