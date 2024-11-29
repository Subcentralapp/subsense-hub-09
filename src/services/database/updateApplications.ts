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
  console.log("Restauration des applications...");
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

    // Insérer toutes les applications par lots de 50 pour éviter les limitations
    const chunkSize = 50;
    for (let i = 0; i < allApplications.length; i += chunkSize) {
      const chunk = allApplications.slice(i, i + chunkSize);
      const { error: insertError } = await supabase
        .from('applications')
        .insert(chunk);

      if (insertError) {
        console.error("Erreur lors de l'insertion du lot:", insertError);
        throw insertError;
      }
      console.log(`Lot ${Math.floor(i / chunkSize) + 1} inséré avec succès`);
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