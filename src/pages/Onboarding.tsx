import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function Onboarding() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
      }
    };

    checkAuth();
  }, [navigate]);

  return <OnboardingForm />;
}