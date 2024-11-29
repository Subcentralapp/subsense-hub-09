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
  });

  const handleAddSubscription = async (app: Application) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("Utilisateur non connecté, redirection vers l'authentification");
        navigate("/auth");
        return;
      }

      // Utiliser la date du jour + 1 mois comme date de prélèvement par défaut
      const nextBilling = new Date();
      nextBilling.setMonth(nextBilling.getMonth() + 1);

      const subscriptionData = {
        name: app.name,
        price: app.price,
        category: app.category,
        next_billing: nextBilling.toISOString(),
        description: app.description,
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