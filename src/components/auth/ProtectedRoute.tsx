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

        // Si l'utilisateur est sur la route /onboarding, vérifier s'il a déjà des préférences
        if (location.pathname === '/onboarding') {
          const { data: preferences } = await supabase
            .from('user_preferences')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // Si l'utilisateur a déjà des préférences, le rediriger vers le dashboard
          if (preferences) {
            window.location.href = '/dashboard';
            return;
          }
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
  }, [location.pathname]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};