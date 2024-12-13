import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";

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

        console.log(`✅ ComparisonSearch - ${data?.length || 0} applications chargées`);
        setApplications(data || []);
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
    app.NOM?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAppSelect = (app: Application) => {
    console.log("📱 ComparisonSearch - Application sélectionnée:", app.NOM);
    if (selectedApps.find(a => a.id === app.id)) {
      setSelectedApps(prev => prev.filter(a => a.id !== app.id));
    } else if (selectedApps.length < 3) {
      setSelectedApps(prev => [...prev, app]);
      if (selectedApps.length === 1) {
        onSelect([...selectedApps, app]);
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApps.map((app) => (
            <Button
              key={app.id}
              variant={selectedApps.find(a => a.id === app.id) ? "default" : "outline"}
              className="justify-start h-auto p-4"
              onClick={() => handleAppSelect(app)}
            >
              <div className="flex items-center gap-3">
                {app.URL_DU_LOGO && (
                  <img 
                    src={app.URL_DU_LOGO} 
                    alt={app.NOM || "Logo"} 
                    className="w-8 h-8 object-contain"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium">{app.NOM}</p>
                  <p className="text-sm text-muted-foreground">{app.CATÉGORIE}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ComparisonSearch;