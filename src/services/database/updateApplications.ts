import { supabase } from "@/lib/supabase";
import { fallbackApplications } from "@/data/fallbackApplications";
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
  console.log("Starting applications restoration...");

  try {
    // Vérifier d'abord le nombre d'applications actuelles
    const { count: currentCount } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true });

    console.log("Current number of applications:", currentCount);

    // Si nous avons moins d'applications que prévu, restaurons-les
    if (!currentCount || currentCount < allApplications.length) {
      console.log("Restoring all applications...");
      
      // Utiliser upsert pour éviter les doublons et préserver les données existantes
      const { data, error } = await supabase
        .from('applications')
        .upsert(
          allApplications,
          {
            onConflict: 'name',
            ignoreDuplicates: false // Met à jour si existe, insère si nouveau
          }
        );

      if (error) {
        console.error("Error restoring applications:", error);
        throw error;
      }

      console.log("Applications restored successfully");
      return data;
    }

    console.log("Database already contains all applications");
    return null;
  } catch (error) {
    console.error("Error in updateApplications:", error);
    throw error;
  }
};