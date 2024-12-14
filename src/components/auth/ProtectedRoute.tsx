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

        setIsAuthenticated(true);

        // Si l'utilisateur n'a pas de préférences et n'est pas sur la page d'onboarding
        if (!preferences && location.pathname !== '/onboarding') {
          console.log("🆕 Première connexion, redirection vers onboarding");
          navigate('/onboarding', { replace: true });
        } else if (preferences) {
          // Si l'utilisateur a des préférences, rediriger vers le dashboard
          console.log("👉 Utilisateur existant, redirection vers le dashboard");
          navigate('/dashboard', { replace: true });
        }

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
        
        if (!preferences && location.pathname !== '/onboarding') {
          console.log("🆕 Nouvel utilisateur connecté, redirection vers onboarding");
          navigate('/onboarding', { replace: true });
        } else {
          console.log("👉 Utilisateur existant, redirection vers le dashboard");
          navigate('/dashboard', { replace: true });
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        navigate('/landing', { replace: true });
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