import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRedirectToOnboarding, setShouldRedirectToOnboarding] = useState<boolean | null>(null);
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    console.log("🔒 ProtectedRoute - Vérification de l'authentification...");

    const checkAuth = async () => {
      try {
        console.log("🔍 Vérification de la session...");
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("❌ Erreur lors de la vérification de la session:", sessionError);
          if (mounted) {
            setIsAuthenticated(false);
            toast({
              title: "Erreur de session",
              description: "Veuillez vous reconnecter.",
              variant: "destructive",
            });
          }
          return;
        }

        if (!session) {
          console.log("⚠️ Pas de session trouvée, redirection vers l'identification");
          if (mounted) {
            setIsAuthenticated(false);
          }
          return;
        }

        console.log("✅ Session trouvée, vérification des préférences");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("❌ Erreur lors de la vérification des préférences:", preferencesError);
          toast({
            title: "Erreur",
            description: "Impossible de charger vos préférences.",
            variant: "destructive",
          });
        }

        if (mounted) {
          setIsAuthenticated(true);
          setShouldRedirectToOnboarding(!preferences);
          console.log("✅ Vérification d'authentification terminée", {
            isAuthenticated: true,
            shouldRedirectToOnboarding: !preferences
          });
        }
      } catch (error) {
        console.error("❌ Erreur inattendue lors de la vérification:", error);
        if (mounted) {
          setIsAuthenticated(false);
          toast({
            title: "Erreur",
            description: "Une erreur est survenue lors de la vérification de votre session.",
            variant: "destructive",
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("🔄 État de l'authentification changé:", event, session?.user?.email);
      
      if (!session && mounted) {
        console.log("👋 Session terminée");
        setIsAuthenticated(false);
        setShouldRedirectToOnboarding(null);
        return;
      }

      if (session && mounted) {
        console.log("✅ Session active");
        const { data: preferences, error: preferencesError } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (preferencesError && preferencesError.code !== 'PGRST116') {
          console.error("❌ Erreur lors de la vérification des préférences:", preferencesError);
        }

        setIsAuthenticated(true);
        setShouldRedirectToOnboarding(!preferences);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [location.pathname, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log("🚫 Non authentifié, redirection vers identification");
    return <Navigate to="/identification" state={{ from: location }} replace />;
  }

  if (shouldRedirectToOnboarding && location.pathname !== '/onboarding') {
    console.log("🆕 Redirection vers l'onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  if (shouldRedirectToOnboarding === false && location.pathname === '/onboarding') {
    console.log("↩️ Redirection vers le tableau de bord depuis l'onboarding");
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}