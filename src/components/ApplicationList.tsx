import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import ApplicationDialog from "./dialog/ApplicationDialog";
import { Application } from "@/types/application";
import { fallbackApplications } from "@/data/fallbackApplications";
import { updateApplications } from "@/services/database/updateApplications";
import { updateVPNApplications } from "@/services/database/updateVPNApplications";

const fetchApplications = async () => {
  console.log("Tentative de récupération des applications depuis Supabase...");
  try {
    // Mettre à jour les applications VPN
    await updateVPNApplications();
    console.log("Applications VPN mises à jour avec succès");

    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur Supabase:", error);
      console.log("Utilisation des données de secours...");
      const updatedData = await updateApplications();
      console.log("Données de secours:", updatedData || fallbackApplications);
      return updatedData || fallbackApplications;
    }

    if (!data || data.length === 0) {
      console.log("Aucune donnée trouvée, utilisation des données de secours...");
      const updatedData = await updateApplications();
      console.log("Données de secours:", updatedData || fallbackApplications);
      return updatedData || fallbackApplications;
    }

    const uniqueApps = data.reduce((acc: Application[], current) => {
      const exists = acc.find(app => 
        app.name.toLowerCase() === current.name.toLowerCase()
      );
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    console.log("Applications récupérées depuis Supabase:", uniqueApps);
    return uniqueApps;
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    console.log("Utilisation des données de secours suite à une erreur...");
    return fallbackApplications;
  }
};

const ApplicationList = () => {
  const { toast } = useToast();
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
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour ajouter un abonnement.",
          variant: "destructive",
        });
        return;
      }

      const billingDate = nextBilling || new Date();
      billingDate.setMonth(billingDate.getMonth() + 1);

      const { error } = await supabase.from("subscriptions").insert({
        name: app.name,
        price: customPrice || app.price,
        category: app.category,
        next_billing: billingDate.toISOString(),
        description: app.description,
        user_id: user.id,
      });

      if (error) throw error;

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
      applications={applications} 
      isLoading={isLoading} 
      onAddSubscription={handleAddSubscription} 
    />
  );
};

export default ApplicationList;