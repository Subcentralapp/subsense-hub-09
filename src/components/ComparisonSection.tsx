import ComparisonSearch from "@/components/comparison/ComparisonSearch";
import { ComparisonResult } from "@/components/comparison/ComparisonResult";
import { useState, useEffect } from "react";
import { Application } from "@/types/application";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ComparisonSection = () => {
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let isSubscribed = true;

    const checkSession = async () => {
      try {
        console.log("🔍 ComparisonSection - Vérification de la session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        // Vérifier si le composant est toujours monté
        if (!isSubscribed) return;

        if (error) {
          console.error("❌ ComparisonSection - Erreur lors de la vérification de la session:", error);
          toast({
            title: "Erreur de session",
            description: "Impossible de vérifier votre session",
            variant: "destructive",
          });
          navigate("/identification", { replace: true });
          return;
        }

        if (!session) {
          console.log("⚠️ ComparisonSection - Pas de session active, redirection...");
          navigate("/identification", { replace: true });
          return;
        }

        console.log("✅ ComparisonSection - Session active trouvée:", session.user.email);
      } catch (error) {
        if (!isSubscribed) return;
        console.error("❌ ComparisonSection - Erreur inattendue:", error);
        navigate("/identification", { replace: true });
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    // Vérifier la session immédiatement
    checkSession();

    // Écouter les changements d'état d'authentification avec un timeout de sécurité
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isSubscribed) return;
      
      console.log("🔄 ComparisonSection - État de l'authentification changé:", event);
      
      if (event === 'SIGNED_OUT' || !session) {
        console.log("👋 ComparisonSection - Utilisateur déconnecté, redirection...");
        navigate("/identification", { replace: true });
      }
    });

    // Cleanup function
    return () => {
      isSubscribed = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

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