import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Application = {
  name: string;
  price: number;
  category: string;
  description: string | null;
};

const ApplicationList = () => {
  const { toast } = useToast();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      console.log("Fetching applications...");
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("name");

      if (error) {
        console.error("Error fetching applications:", error);
        throw error;
      }

      console.log("Applications fetched:", data);
      return data as Application[];
    },
  });

  const handleAddSubscription = async (app: Application) => {
    try {
      console.log("Adding subscription for:", app.name);
      const nextBillingDate = new Date();
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

      const { error } = await supabase.from("subscriptions").insert({
        name: app.name,
        price: app.price,
        category: app.category,
        next_billing: nextBillingDate.toISOString(),
        description: app.description,
      });

      if (error) throw error;

      toast({
        title: "Abonnement ajouté",
        description: `L'abonnement à ${app.name} a été ajouté avec succès.`,
      });
      
      setSelectedApp(null);
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'abonnement.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div>Chargement des applications...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Ajouter un abonnement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choisir une application</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {applications?.map((app) => (
            <div
              key={app.name}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
            >
              <div>
                <h4 className="font-medium">{app.name}</h4>
                <p className="text-sm text-gray-500">{app.category}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">{app.price} €/mois</p>
                <Button onClick={() => handleAddSubscription(app)}>
                  Ajouter
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationList;