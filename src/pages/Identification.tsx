import { useEffect, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { OptimizedImage } from "@/components/ui/optimized-image";

// Lazy load the AuthForm component
const AuthForm = lazy(() => import("@/components/auth/AuthForm"));

const Identification = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up auth state change listener");
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (session) {
        console.log("User signed in, redirecting to dashboard");
        navigate("/dashboard");
      } else if (event === 'SIGNED_OUT') {
        console.log("User signed out");
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex md:flex-row flex-col bg-background">
      {/* Image Section */}
      <div className="hidden md:flex w-1/2 relative bg-primary/5">
        <OptimizedImage
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
          lowQualityUrl="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=50&q=20"
          alt="Personne travaillant sur un ordinateur"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
      </div>

      {/* Auth Form Section */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary">
              Bienvenue
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Connectez-vous ou créez un compte pour continuer
            </p>
          </div>

          <Suspense fallback={
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          }>
            <AuthForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Identification;