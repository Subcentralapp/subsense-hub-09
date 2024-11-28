import { supabase } from "@/lib/supabase";
import { fallbackApplications } from "@/data/fallbackApplications";

export const updateApplications = async () => {
  console.log("Starting applications update...");

  try {
    // Delete existing applications
    const { error: deleteError } = await supabase
      .from('applications')
      .delete()
      .neq('name', ''); // Delete all rows

    if (deleteError) {
      console.error("Error deleting existing applications:", deleteError);
      throw deleteError;
    }

    console.log("Existing applications deleted successfully");

    // Insert updated applications
    const { data, error: insertError } = await supabase
      .from('applications')
      .insert(fallbackApplications)
      .select();

    if (insertError) {
      console.error("Error inserting applications:", insertError);
      throw insertError;
    }

    console.log("Applications updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in updateApplications:", error);
    throw error;
  }
};