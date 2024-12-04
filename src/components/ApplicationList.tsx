import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ApplicationDialog from "./dialog/ApplicationDialog";
import { Application } from "@/types/application";
import { useNavigate } from "react-router-dom";
import SubscriptionCustomizeDialog from "./dialog/SubscriptionCustomizeDialog";
import { useState } from "react";

const fetchApplications = async () => {
  console.log("Fetching applications from Supabase...");
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("NOM");

    if (error) throw error;

    return data.map(app => ({
      id: app.id,
      name: app.NOM,
      price: app.PRICE ? parseFloat(app.PRICE) : 0,
      category: app.CATÉGORIE,
      description: app.DESCRIPTION,
      features: app.CARACTÉRISTIQUES as string[],
      pros: app.AVANTAGES,
      cons: app.INCONVÉNIENTS,
      website_url: app["URL DU SITE WEB"],
      logo_url: app["URL DU LOGO"],
      rating: app.NOTE,
      review: app.REVUE,
      users_count: app["NOMBRE D'UTILISATEURS"]
    }));
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

const ApplicationList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const handleAddSubscription = async (app: Application) => {
    console.log("Opening customization dialog for:", app.name);
    setSelectedApp(app);
  };

  const handleConfirmSubscription = async (
    price: number, 
    nextBilling: Date, 
    isTrial: boolean, 
    trialEndDate: Date | null
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("User not authenticated, redirecting to auth");
        navigate("/auth");
        return;
      }

      if (!selectedApp) return;

      const { error } = await supabase
        .from("subscriptions")
        .insert({
          name: selectedApp.name,
          price: price,
          category: selectedApp.category,
          next_billing: nextBilling.toISOString(),
          description: selectedApp.description,
          user_id: user.id,
          is_trial: isTrial,
          trial_end_date: trialEndDate?.toISOString() || null,
        });

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ["subscriptions"] });

      toast({
        title: "Abonnement ajouté",
        description: `L'abonnement à ${selectedApp.name} a été ajouté avec succès${isTrial ? ' avec une période d\'essai' : ''}.`,
      });

      setSelectedApp(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'abonnement.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ApplicationDialog 
        applications={applications || []} 
        isLoading={isLoading} 
        onAddSubscription={handleAddSubscription}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <SubscriptionCustomizeDialog
        app={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onConfirm={handleConfirmSubscription}
      />
    </>
  );
};

export default ApplicationList;