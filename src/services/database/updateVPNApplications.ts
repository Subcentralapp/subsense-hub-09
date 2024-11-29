import { supabase } from "@/lib/supabase";
import { vpnApplications } from "@/data/applications/vpn-applications";

export const updateVPNApplications = async () => {
  console.log("Mise à jour des applications VPN...");

  try {
    // Utiliser upsert pour préserver les données existantes
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
          ignoreDuplicates: true // Ne met pas à jour si l'application existe déjà
        }
      );

    if (error) {
      console.error("Erreur lors de la mise à jour des VPN:", error);
      throw error;
    }

    console.log("Applications VPN mises à jour avec succès:", data);
    return data;
  } catch (error) {
    console.error("Erreur dans updateVPNApplications:", error);
    throw error;
  }
};