import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 ProtectedRoute - Vérification de la session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("❌ Erreur lors de la vérification de la session:", error);
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        console.log("✅ État de la session:", !!session);
        setIsAuthenticated(!!session);
        setIsLoading(false);
      } catch (error) {
        console.error("❌ Erreur inattendue:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    // Vérification initiale
    checkAuth();

    // Écouter les changements d'authentification
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
    console.log("🚫 Non authentifié, redirection vers /landing");
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}