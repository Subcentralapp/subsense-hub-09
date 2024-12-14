import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

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

        if (!session) {
          console.log("👤 Pas de session active");
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Vérifier si l'utilisateur a déjà des préférences
        console.log("🔍 Vérification des préférences utilisateur...");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("❌ Erreur lors de la vérification des préférences:", preferencesError);
          throw preferencesError;
        }

        console.log("✅ État de la session:", !!session);
        console.log("📋 Préférences trouvées:", !!preferences);
        
        setIsAuthenticated(true);
        setIsLoading(false);

        // Rediriger vers l'onboarding uniquement si:
        // 1. L'utilisateur est authentifié
        // 2. N'a pas encore de préférences
        // 3. N'est pas déjà sur la page d'onboarding
        if (!preferences && location.pathname !== '/onboarding') {
          console.log("🆕 Première connexion, redirection vers onboarding");
          navigate('/onboarding', { replace: true });
        }
      } catch (error) {
        console.error("❌ Erreur inattendue:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    // Vérification initiale
    checkAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 État d'authentification changé:", event);
      
      if (event === 'SIGNED_IN' && session) {
        // Vérifier les préférences lors de la connexion
        const { data: preferences } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setIsAuthenticated(true);
        
        // Rediriger vers l'onboarding uniquement pour les nouveaux utilisateurs
        if (!preferences && location.pathname !== '/onboarding') {
          console.log("🆕 Nouvel utilisateur connecté, redirection vers onboarding");
          navigate('/onboarding', { replace: true });
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [location.pathname, navigate]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.log("🚫 Non authentifié, redirection vers /landing");
    return <Navigate to="/landing" replace />;
  }

  return <>{children}</>;
}