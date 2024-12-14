import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 Vérification de la session...");
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          console.log("❌ Aucune session trouvée");
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        console.log("✅ Session trouvée");
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erreur lors de la vérification de la session:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("🔄 État d'authentification changé:", event);
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};