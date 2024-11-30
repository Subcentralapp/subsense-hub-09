import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { User, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useToast } from "./ui/use-toast";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in Navbar:", event, session);
      setUser(session?.user ?? null);
    });

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  // Don't show navbar on landing page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate(user ? "/dashboard" : "/")}>
            <h1 className="text-xl font-bold text-primary">SubaCentral</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => navigate("/profile")}
                >
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                >
                  Déconnexion
                </Button>
              </>
            ) : (
              <Button
                className="flex items-center space-x-2"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-4 w-4" />
                <span>Connexion</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};