import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in Header:", event, session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div 
            className="flex-shrink-0 cursor-pointer" 
            onClick={() => navigate("/")}
          >
            <h1 className="text-xl font-bold text-primary">SubaCentral</h1>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <Button onClick={() => navigate("/dashboard")}>
                Tableau de bord
              </Button>
            ) : (
              <Button
                variant="outline"
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
    </header>
  );
};