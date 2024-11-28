import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const ApplicationImport = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur lors de la récupération des applications:", error);
      return;
    }

    setApplications(data || []);
  };

  const parseText = (text: string) => {
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

  const handleImport = async () => {
    try {
      setIsLoading(true);
      const newApplications = parseText(text);
      
      if (newApplications.length === 0) {
        toast({
          title: "Erreur",
          description: "Aucune application à importer",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from("applications")
        .insert(newApplications);

      if (error) throw error;

      toast({
        title: "Succès",
        description: `${newApplications.length} applications importées avec succès`,
      });
      
      setText("");
      fetchApplications(); // Rafraîchir la liste
    } catch (error) {
      console.error("Erreur lors de l'import:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'import",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Importer des applications</h2>
        <p className="text-sm text-muted-foreground">
          Format: nom,prix,catégorie,description (une application par ligne)
        </p>
        <div className="space-y-2">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Netflix,15.99,Streaming,Service de streaming vidéo&#10;Spotify,9.99,Musique,Service de streaming musical"
            className="min-h-[200px]"
          />
          <Button 
            onClick={handleImport} 
            disabled={!text.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Import en cours..." : "Importer"}
          </Button>
        </div>
      </div>

      {applications.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Applications importées</h3>
          <div className="space-y-2">
            {applications.map((app: any) => (
              <div
                key={app.name}
                className="p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{app.name}</h4>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                  <p className="font-medium">{app.price} €/mois</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationImport;