import { supabase } from "@/lib/supabase";
import { vpnApplications } from "@/data/applications/vpn-applications";

export const updateVPNApplications = async () => {
  console.log("Starting VPN applications update...");

  try {
    // Utiliser upsert au lieu de delete + insert pour préserver les données existantes
    const { data, error } = await supabase
      .from('applications')
      .upsert(
        vpnApplications.map(app => ({
          name: app.name,
          price: app.price,
          category: app.category,
          description: app.description,
          website_url: app.website_url,
          logo_url: app.logo_url
        })),
        {
          onConflict: 'name',
          ignoreDuplicates: false // Met à jour si existe, insère si nouveau
        }
      );

    if (error) {
      console.error("Error updating VPN applications:", error);
      throw error;
    }

    console.log("VPN applications updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in updateVPNApplications:", error);
    throw error;
  }
};