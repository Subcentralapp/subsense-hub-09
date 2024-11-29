import { supabase } from "@/lib/supabase";
import { Toast } from "@/components/ui/use-toast";

export const parseApplicationText = (text: string) => {
  return text
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => {
      const [name, price, category, description = ""] = line.split(",").map((item) => item.trim());
      return {
        name,
        price: parseFloat(price),
        category,
        description,
      };
    });
};

export const handleApplicationImport = async (text: string, toast: Toast) => {
  const applications = parseApplicationText(text);
  
  if (applications.length === 0) {
    toast({
      title: "Erreur",
      description: "Aucune application à importer",
      variant: "destructive",
    });
    return;
  }

  console.log("Attempting to upsert applications:", applications);
  
  const { error } = await supabase
    .from("applications")
    .upsert(applications, {
      onConflict: 'name',
      ignoreDuplicates: false
    });

  if (error) {
    console.error("Error during upsert:", error);
    throw error;
  }

  console.log("Applications upserted successfully");
  
  toast({
    title: "Succès",
    description: `${applications.length} applications importées avec succès`,
  });
};