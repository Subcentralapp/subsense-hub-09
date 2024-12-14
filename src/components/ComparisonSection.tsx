import ComparisonSearch from "@/components/comparison/ComparisonSearch";
import { ComparisonResult } from "@/components/comparison/ComparisonResult";
import { useState, useEffect } from "react";
import { Application } from "@/types/application";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ComparisonSection = () => {
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("🔍 ComparisonSection - Vérification de la session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ ComparisonSection - Erreur lors de la vérification de la session:", error);
          toast({
            title: "Erreur de session",
            description: "Impossible de vérifier votre session",
            variant: "destructive",
          });
          return;
        }

        if (!session) {
          console.log("⚠️ ComparisonSection - Pas de session active");
          return;
        }

        console.log("✅ ComparisonSection - Session active trouvée:", session.user.email);
      } catch (error) {
        console.error("❌ ComparisonSection - Erreur inattendue:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [toast]);

  const handleAppSelect = (apps: Application[]) => {
    console.log("📱 ComparisonSection - Applications sélectionnées:", apps);
    setSelectedApps(apps);
  };

  const handleNewComparison = () => {
    console.log("🔄 ComparisonSection - Nouvelle comparaison initiée");
    setSelectedApps([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {selectedApps.length < 2 ? (
        <ComparisonSearch onSelect={handleAppSelect} />
      ) : (
        <ComparisonResult 
          apps={selectedApps}
          onNewComparison={handleNewComparison}
        />
      )}
    </div>
  );
};

export default ComparisonSection;