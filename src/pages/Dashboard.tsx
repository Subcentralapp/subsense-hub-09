import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { AppsContent } from "@/components/dashboard/AppsContent";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";
import { CompareContent } from "@/components/dashboard/CompareContent";
import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";

const TechnicalStackSuggestion = lazy(() => 
  import("@/components/TechnicalStackSuggestion").then(module => ({
    default: module.TechnicalStackSuggestion
  }))
);

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "apps":
        return (
          <Suspense fallback={<div>Chargement...</div>}>
            <TechnicalStackSuggestion />
          </Suspense>
        );
      case "payments":
        return <PaymentsContent />;
      case "compare":
        return <CompareContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="space-y-4 sm:space-y-8">
        <DashboardNavigation />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;