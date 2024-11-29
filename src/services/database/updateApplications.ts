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
  console.log("Restauration des applications...");
  console.log("Nombre total d'applications à restaurer:", allApplications.length);

  try {
    // Instead of deleting and reinserting, we'll use upsert
    const chunkSize = 50;
    for (let i = 0; i < allApplications.length; i += chunkSize) {
      const chunk = allApplications.slice(i, i + chunkSize);
      const { error: upsertError } = await supabase
        .from('applications')
        .upsert(chunk, {
          onConflict: 'name',
          ignoreDuplicates: false // This will update existing entries
        });

      if (upsertError) {
        console.error("Erreur lors de l'upsert du lot:", upsertError);
        throw upsertError;
      }
      console.log(`Lot ${Math.floor(i / chunkSize) + 1} mis à jour avec succès`);
    }

    // Vérifier le nombre d'applications après la restauration
    const { data: checkData, error: checkError } = await supabase
      .from('applications')
      .select('count');

    if (checkError) {
      console.error("Erreur lors de la vérification:", checkError);
    } else {
      console.log("Nombre d'applications restaurées:", checkData[0].count);
    }

    // Récupérer toutes les applications pour les retourner
    const { data, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .order('name');

    if (fetchError) {
      console.error("Erreur lors de la récupération:", fetchError);
      throw fetchError;
    }

    console.log("Applications restaurées avec succès");
    return data;
  } catch (error) {
    console.error("Erreur dans updateApplications:", error);
    throw error;
  }
};