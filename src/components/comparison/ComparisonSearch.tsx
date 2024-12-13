import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Loader2 } from "lucide-react";

interface ComparisonSearchProps {
  onSelect: (apps: Application[]) => void;
}

const ComparisonSearch = ({ onSelect }: ComparisonSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        console.log("🔍 ComparisonSearch - Chargement des applications...");
        const { data, error } = await supabase
          .from("applications")
          .select("*")
          .order("NOM", { ascending: true });

        if (error) {
          console.error("❌ ComparisonSearch - Erreur lors du chargement:", error);
          throw error;
        }

        const formattedData: Application[] = data.map(app => ({
          id: app.id,
          name: app.NOM || '',
          price: app.PRICE ? parseFloat(app.PRICE) : 0,
          category: app.CATÉGORIE || null,
          description: app.DESCRIPTION || null,
          features: Array.isArray(app.CARACTÉRISTIQUES) ? app.CARACTÉRISTIQUES : [],
          pros: app.AVANTAGES || null,
          cons: app.INCONVÉNIENTS || null,
          website_url: app["URL DU SITE WEB"] || null,
          logo_url: app["URL DU LOGO"] || null,
          rating: app.NOTE || null,
          review: app.REVUE || null,
          users_count: app["NOMBRE D'UTILISATEURS"] || null
        }));

        console.log(`✅ ComparisonSearch - ${formattedData.length} applications chargées`);
        setApplications(formattedData);
      } catch (error) {
        console.error("❌ ComparisonSearch - Erreur inattendue:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les applications",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const filteredApps = applications.filter(app => 
    app.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppSelect = (app: Application) => {
    if (selectedApps.length >= 3) {
      toast({
        title: "Maximum atteint",
        description: "Vous ne pouvez comparer que 3 applications à la fois",
        variant: "destructive",
      });
      return;
    }

    if (selectedApps.find(a => a.id === app.id)) {
      setSelectedApps(prev => prev.filter(a => a.id !== app.id));
    } else {
      const newSelectedApps = [...selectedApps, app];
      setSelectedApps(newSelectedApps);
      if (newSelectedApps.length >= 2) {
        onSelect(newSelectedApps);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher une application..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`border-2 border-dashed rounded-lg p-4 min-h-[200px] ${
                selectedApps[index]
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              {selectedApps[index] ? (
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    {selectedApps[index].logo_url && (
                      <img
                        src={selectedApps[index].logo_url}
                        alt={selectedApps[index].name}
                        className="w-12 h-12 object-contain rounded-lg"
                      />
                    )}
                    <div>
                      <h3 className="font-medium">{selectedApps[index].name}</h3>
                      <p className="text-sm text-gray-500">
                        {selectedApps[index].category}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-auto text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleAppSelect(selectedApps[index])}
                  >
                    Retirer
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Plus className="h-8 w-8 mb-2" />
                  <p className="text-sm text-center">
                    Sélectionnez une application à comparer
                  </p>
                  {searchTerm && filteredApps.length > 0 && (
                    <div className="mt-4 w-full space-y-2">
                      {filteredApps.slice(0, 3).map((app) => (
                        <Button
                          key={app.id}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleAppSelect(app)}
                        >
                          <div className="flex items-center gap-2">
                            {app.logo_url && (
                              <img
                                src={app.logo_url}
                                alt={app.name}
                                className="w-6 h-6 object-contain"
                              />
                            )}
                            <span>{app.name}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ComparisonSearch;