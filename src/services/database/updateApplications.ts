import { supabase } from "@/lib/supabase";
import { streamingApplications } from "@/data/applications/streaming-applications";
import { musicApplications } from "@/data/applications/music-applications";
import { gamingApplications } from "@/data/applications/gaming-applications";
import { productivityApplications } from "@/data/applications/productivity-applications";
import { educationApplications } from "@/data/applications/education-applications";
import { wellbeingApplications } from "@/data/applications/wellbeing-applications";
import { aiApplications } from "@/data/applications/ai-applications";
import { vpnApplications } from "@/data/applications/vpn-applications";
import { foodApplications } from "@/data/applications/food-applications";

// Combine all applications
const allApplications = [
  ...streamingApplications,
  ...musicApplications,
  ...gamingApplications,
  ...productivityApplications,
  ...educationApplications,
  ...wellbeingApplications,
  ...aiApplications,
  ...vpnApplications,
  ...foodApplications
];

export const updateApplications = async () => {
  console.log("Forçage de la restauration des applications...");
  console.log("Nombre total d'applications à restaurer:", allApplications.length);

  try {
    // Supprimer d'abord toutes les applications existantes
    const { error: deleteError } = await supabase
      .from('applications')
      .delete()
      .neq('name', ''); // Supprime toutes les applications

    if (deleteError) {
      console.error("Erreur lors de la suppression:", deleteError);
      throw deleteError;
    }

    // Insérer toutes les applications
    const { data, error: insertError } = await supabase
      .from('applications')
      .insert(allApplications)
      .select();

    if (insertError) {
      console.error("Erreur lors de l'insertion:", insertError);
      throw insertError;
    }

    console.log("Applications restaurées avec succès. Nombre d'applications:", data?.length);
    return data;
  } catch (error) {
    console.error("Erreur dans updateApplications:", error);
    throw error;
  }
};