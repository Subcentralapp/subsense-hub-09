import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import ApplicationDialog from "./dialog/ApplicationDialog";
import { Application } from "@/types/application";
import { fallbackApplications } from "@/data/fallbackApplications";

const fetchApplications = async () => {
  console.log("Tentative de récupération des applications depuis Supabase...");
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur Supabase:", error);
      console.log("Utilisation de la liste de repli...");
      return fallbackApplications;
    }

    if (!data || data.length === 0) {
      console.log("Aucune donnée trouvée, utilisation de la liste de repli...");
      return fallbackApplications;
    }

    // Dédoublonnage côté serveur
    const uniqueApps = Array.from(
      new Map(data.map(app => [`${app.name}-${app.category}`, app])).values()
    );

    console.log("Applications uniques récupérées:", uniqueApps);
    return uniqueApps as Application[];
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    console.log("Utilisation de la liste de repli...");
    return fallbackApplications;
  }
};

const ApplicationList = () => {
  const { toast } = useToast();
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications,
    staleTime: 0, // Force le rafraîchissement des données
    gcTime: 0, // Désactive la mise en cache (remplace cacheTime dans v5)
  });

  const handleAddSubscription = async (app: Application) => {
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

      const nextBillingDate = new Date();
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

      const { error } = await supabase.from("subscriptions").insert({
        name: app.name,
        price: app.price,
        category: app.category,
        next_billing: nextBillingDate.toISOString(),
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

  return <ApplicationDialog applications={applications} isLoading={isLoading} onAddSubscription={handleAddSubscription} />;
};

export default ApplicationList;