import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { AppsContent } from "@/components/dashboard/AppsContent";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";
import { CompareContent } from "@/components/dashboard/CompareContent";
import { useState } from "react";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";

const Dashboard = () => {
  console.log("Dashboard page rendering");
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardContent />;
      case "apps":
        return <TechnicalStackSuggestion />;
      case "payments":
        return <PaymentsContent />;
      case "compare":
        return <CompareContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4 sm:space-y-8">
        <DashboardNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;