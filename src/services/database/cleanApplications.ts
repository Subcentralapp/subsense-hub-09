import { supabase } from "@/lib/supabase";

export const cleanApplications = async () => {
  console.log("Nettoyage des applications...");
  
  const appsToDelete = [
    'Airtable',
    'Airtable : 10',
    'Google Gemini',
    'les ia comme perplexity et gemini',
    'Perplexity'
  ];

  try {
    const { error } = await supabase
      .from('applications')
      .delete()
      .filter('name', 'in', appsToDelete);

    if (error) {
      console.error("Erreur lors de la suppression:", error);
      throw error;
    }

    console.log("Applications supprimées avec succès");
    return true;
  } catch (error) {
    console.error("Erreur lors du nettoyage:", error);
    throw error;
  }
};