import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { AppsContent } from "@/components/dashboard/AppsContent";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";
import { CompareContent } from "@/components/dashboard/CompareContent";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const state = location.state as { activeTab?: string } | null;
  const activeTab = state?.activeTab || "dashboard";

  const renderContent = () => {
    switch (activeTab) {
      case "apps":
        return <AppsContent />;
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