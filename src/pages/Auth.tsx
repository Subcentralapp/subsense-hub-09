import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log("User already authenticated, redirecting to dashboard");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-light to-white flex items-center justify-center p-4 pt-24 md:pt-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6 items-center">
        {/* Mobile motivation section */}
        <div className="w-full md:hidden space-y-3 text-center mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Launch Offer</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 px-4">
              Manage your subscriptions with ease
            </h1>
          </motion.div>
        </div>

        {/* Desktop motivation section */}
        <div className="flex-1 hidden md:block">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">
              Take control of your subscriptions
            </h1>
            <p className="text-lg text-gray-600">
              Join thousands of users who are already saving money on their subscriptions.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Visualize your expenses</h3>
                  <p className="text-sm text-gray-500">
                    Get a clear view of all your subscriptions
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Save money</h3>
                  <p className="text-sm text-gray-500">
                    Identify duplicates and optimize your spending
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Never miss a payment</h3>
                  <p className="text-sm text-gray-500">
                    Get reminders for your due dates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Authentication form */}
        <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm">
          <SupabaseAuth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#1a237e',
                    brandAccent: '#1a237e',
                  },
                },
              },
              className: {
                container: 'auth-container',
                label: 'auth-label text-gray-700',
                button: 'auth-button',
                divider: 'auth-divider',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Sign in',
                },
                sign_up: {
                  email_label: 'Email address',
                  password_label: 'Password',
                  button_label: 'Create account',
                },
                magic_link: {
                  button_label: 'Sign in with magic link',
                },
                forgotten_password: {
                  button_label: 'Forgot password?',
                },
              },
            }}
            providers={["google"]}
            redirectTo={`${window.location.origin}/auth/callback`}
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;