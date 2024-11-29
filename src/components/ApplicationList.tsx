import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import ApplicationDialog from "./dialog/ApplicationDialog";
import { Application } from "@/types/application";
import { useNavigate } from "react-router-dom";

const fetchApplications = async () => {
  console.log("Tentative de récupération des applications depuis Supabase...");
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur lors de la récupération:", error);
      throw error;
    }

    console.log("Applications récupérées:", data?.length);
    return data as Application[];
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    throw error;
  }
};

const ApplicationList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const handleAddSubscription = async (
    app: Application, 
    customPrice?: number, 
    nextBilling?: Date
  ) => {
    try {
      console.log("Début de l'ajout d'abonnement:", { app, customPrice, nextBilling });
      
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log("Utilisateur non connecté, redirection vers l'authentification");
        navigate("/auth");
        return;
      }

      if (!nextBilling) {
        console.log("Date de prélèvement manquante");
        toast({
          title: "Erreur",
          description: "Veuillez sélectionner une date de prélèvement",
          variant: "destructive",
        });
        return;
      }

      const subscriptionData = {
        name: app.name,
        price: customPrice || app.price,
        category: app.category,
        next_billing: nextBilling.toISOString(),
        description: app.description,
        user_id: user.id,
      };

      console.log("Données de l'abonnement à insérer:", subscriptionData);

      const { error } = await supabase
        .from("subscriptions")
        .insert(subscriptionData);

      if (error) {
        console.error("Erreur lors de l'insertion:", error);
        throw error;
      }

      console.log("Abonnement ajouté avec succès");

      // Invalider les deux caches
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["subscriptions"] }),
        queryClient.invalidateQueries({ queryKey: ["applications"] })
      ]);

      toast({
        title: "Abonnement ajouté",
        description: `L'abonnement à ${app.name} a été ajouté avec succès.`,
      });
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
    <ApplicationDialog 
      applications={applications || []} 
      isLoading={isLoading} 
      onAddSubscription={handleAddSubscription} 
    />
  );
};

export default ApplicationList;