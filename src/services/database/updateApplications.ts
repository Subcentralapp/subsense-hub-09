import { supabase } from "@/lib/supabase";
import { fallbackApplications } from "@/data/fallbackApplications";

export const updateApplications = async () => {
  console.log("Starting applications update...");

  try {
    // Vérifier d'abord si la base de données est vide
    const { data: existingApps, error: checkError } = await supabase
      .from('applications')
      .select('name');

    if (checkError) {
      console.error("Error checking existing applications:", checkError);
      throw checkError;
    }

    // N'insérer les applications de secours que si la base de données est vide
    if (!existingApps || existingApps.length === 0) {
      console.log("Database is empty, inserting fallback applications...");
      const { data, error: insertError } = await supabase
        .from('applications')
        .insert(fallbackApplications)
        .select();

      if (insertError) {
        console.error("Error inserting applications:", insertError);
        throw insertError;
      }

      console.log("Fallback applications inserted successfully:", data);
      return data;
    }

    console.log("Database already contains applications, skipping fallback insertion");
    return existingApps;
  } catch (error) {
    console.error("Error in updateApplications:", error);
    throw error;
  }
};