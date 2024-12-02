import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Session expirée",
          description: "Veuillez vous reconnecter",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!preferences) {
        navigate("/onboarding");
        return;
      }

      console.log("User authenticated and onboarding completed");
    };

    checkAuth();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="space-y-4 sm:space-y-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
              Tableau de bord
            </h1>
            <DashboardNavigation 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />
          </header>

          <main className="space-y-4 sm:space-y-6">
            {activeTab === "dashboard" && <DashboardContent />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;