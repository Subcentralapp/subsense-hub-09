import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import ApplicationDialog from "./dialog/ApplicationDialog";
import { Application } from "@/types/application";
import { useNavigate } from "react-router-dom";
import SubscriptionCustomizeDialog from "./dialog/SubscriptionCustomizeDialog";
import { useState } from "react";

const fetchApplications = async () => {
  console.log("Tentative de récupération des applications depuis Supabase...");
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("NOM");

    if (error) {
      console.error("Erreur lors de la récupération:", error);
      throw error;
    }

    const mappedData = data.map(app => ({
      id: app.id,
      name: app.NOM,
      price: parseFloat(app.PRICE || "0"),
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

    console.log("Applications récupérées et mappées:", mappedData);
    return mappedData;
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    throw error;
  }
};

const ApplicationList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
  });

  const handleAddSubscription = async (app: Application) => {
    console.log("Ouverture du dialogue de personnalisation pour:", app.name);
    setSelectedApp(app);
  };

  const handleConfirmSubscription = async (price: number, nextBilling: Date) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("Utilisateur non connecté, redirection vers l'authentification");
        navigate("/auth");
        return;
      }

      if (!selectedApp) return;

      const subscriptionData = {
        name: selectedApp.name,
        price: price,
        category: selectedApp.category,
        next_billing: nextBilling.toISOString(),
        description: selectedApp.description,
        user_id: user.id,
      };

      console.log("Ajout de l'abonnement:", subscriptionData);

      const { error } = await supabase
        .from("subscriptions")
        .insert(subscriptionData);

      if (error) {
        console.error("Erreur lors de l'insertion:", error);
        throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["subscriptions"] });

      toast({
        title: "Abonnement ajouté",
        description: `L'abonnement à ${selectedApp.name} a été ajouté avec succès.`,
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

  return (
    <>
      <ApplicationDialog 
        applications={applications || []} 
        isLoading={isLoading} 
        onAddSubscription={handleAddSubscription} 
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