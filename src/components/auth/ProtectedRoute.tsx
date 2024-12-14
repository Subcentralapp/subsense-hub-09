import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        console.log("🔍 ProtectedRoute - Vérification initiale de la session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("❌ Erreur lors de la vérification de la session:", sessionError);
          if (mounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        if (!session) {
          console.log("🚫 Pas de session trouvée, redirection vers /landing");
          if (mounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        // Si nous avons une session, vérifions les préférences
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("❌ Erreur lors de la vérification des préférences:", preferencesError);
        }

        if (mounted) {
          setIsAuthenticated(true);
          setShouldRedirectToOnboarding(!preferences);
          setIsLoading(false);
          console.log("✅ Vérification d'authentification terminée", {
            isAuthenticated: true,
            shouldRedirectToOnboarding: !preferences
          });
        }
      } catch (error) {
        console.error("❌ Erreur dans checkAuth:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    // Vérification initiale
    checkAuth();

    // Écouter les changements d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 État d'authentification changé:", event);
      
      if (!session) {
        console.log("👋 Session terminée, redirection vers /landing");
        if (mounted) {
          setIsAuthenticated(false);
          setShouldRedirectToOnboarding(null);
          setIsLoading(false);
        }
        return;
      }

      // Vérifier les préférences si nous avons une session
      const { data: preferences, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (preferencesError && preferencesError.code !== 'PGRST116') {
        console.error("❌ Erreur lors de la vérification des préférences:", preferencesError);
      }

      if (mounted) {
        setIsAuthenticated(true);
        setShouldRedirectToOnboarding(!preferences);
        setIsLoading(false);
        console.log("✅ Mise à jour de l'état d'authentification", {
          event,
          isAuthenticated: true,
          shouldRedirectToOnboarding: !preferences
        });
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    console.log("🚪 Non authentifié, redirection vers /landing");
    return <Navigate to="/landing" replace />;
  }

  if (shouldRedirectToOnboarding) {
    console.log("🆕 Redirection vers l'onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}