import { supabase } from "@/integrations/supabase/client";

export const updateApplications = async () => {
  console.log("Vérification des applications existantes...");

  try {
    const { data: existingApps, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .order('name');

    if (fetchError) {
      console.error("Erreur lors de la récupération:", fetchError);
      throw fetchError;
    }

    console.log("Applications existantes récupérées:", existingApps?.length || 0);
    return existingApps;
  } catch (error) {
    console.error("Erreur dans updateApplications:", error);
    throw error;
  }
};
