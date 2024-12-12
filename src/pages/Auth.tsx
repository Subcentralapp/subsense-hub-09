import { useEffect, useState } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmailConfirmation } from "@/components/auth/EmailConfirmation";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event);
        if (event === "SIGNED_IN" && session) {
          navigate("/dashboard");
        } else if (event === "SIGNED_UP") {
          setEmail(session?.user?.email || null);
          setShowConfirmation(true);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (showConfirmation && email) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <EmailConfirmation email={email} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1a237e",
                  brandAccent: "#121858",
                },
              },
            },
          }}
          providers={["google"]}
          redirectTo={`${window.location.origin}/auth?email_confirmed=true`}
        />
      </div>
    </div>
  );
};

export default Auth;