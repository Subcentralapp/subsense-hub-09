import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    console.log("ProtectedRoute - Checking authentication...");
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session check error:", sessionError);
          if (mounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        if (!session) {
          console.log("No session found, redirecting to identification");
          if (mounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        console.log("Session found, checking preferences");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("Error checking preferences:", preferencesError);
        }

        if (mounted) {
          setIsAuthenticated(true);
          setShouldRedirectToOnboarding(!preferences);
          setIsLoading(false);
          console.log("Authentication check complete", {
            isAuthenticated: true,
            shouldRedirectToOnboarding: !preferences
          });
        }
      } catch (error) {
        console.error("Error in checkAuth:", error);
        if (mounted) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log("Auth state changed:", _event, session?.user?.id);
      if (mounted) {
        if (!session) {
          setIsAuthenticated(false);
          setShouldRedirectToOnboarding(null);
          setIsLoading(false);
          return;
        }

        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("Error checking preferences:", preferencesError);
        }

        setIsAuthenticated(true);
        setShouldRedirectToOnboarding(!preferences);
        setIsLoading(false);
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
    console.log("Not authenticated, redirecting to identification");
    return <Navigate to="/identification" replace />;
  }

  if (shouldRedirectToOnboarding && window.location.pathname !== '/onboarding') {
    console.log("Redirecting to onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  if (shouldRedirectToOnboarding === false && window.location.pathname === '/onboarding') {
    console.log("Redirecting to dashboard from onboarding");
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}