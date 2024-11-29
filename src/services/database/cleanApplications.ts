import { supabase } from "@/lib/supabase";

export const cleanApplications = async () => {
  console.log("Nettoyage des applications...");
  
  const appsToDelete = [
    'Airtable : 10',
    'Google Gemini',
    'les ia comme perplexity et gemini'
  ];

  try {
    const { error } = await supabase
      .from('applications')
      .delete()
      .in('name', appsToDelete);

    if (error) {
      console.error("Erreur lors de la suppression:", error);
      throw error;
    }

    console.log("Applications supprimées avec succès");
    
    // Invalider le cache de react-query
    return true;
  } catch (error) {
    console.error("Erreur lors du nettoyage:", error);
    throw error;
  }
};