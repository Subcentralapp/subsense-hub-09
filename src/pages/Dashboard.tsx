import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";
import { CompareContent } from "@/components/dashboard/CompareContent";
import { AppsContent } from "@/components/dashboard/AppsContent";
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const checkAuth = async () => {
      console.log("🔍 Checking authentication status...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("❌ No user found, redirecting to auth");
        toast({
          title: "Session expirée",
          description: "Veuillez vous reconnecter",
          variant: "destructive",
        });
        navigate("/auth");
        return;
      }

      console.log("✅ User is authenticated");
    };

    checkAuth();
  }, [navigate, toast]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "payments":
        return <PaymentsContent />;
      case "compare":
        return <CompareContent />;
      case "apps":
        return <AppsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="space-y-4 sm:space-y-8">
          <header className="flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center sm:text-left">
              Tableau de bord
            </h1>
            <DashboardNavigation />
          </header>

          <main className="space-y-4 sm:space-y-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;