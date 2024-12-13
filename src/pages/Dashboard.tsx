import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { AppsContent } from "@/components/dashboard/AppsContent";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";
import { CompareContent } from "@/components/dashboard/CompareContent";
import { useState, useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="space-y-4 sm:space-y-8">
        <DashboardNavigation />
        <Routes>
          <Route path="/" element={<DashboardContent />} />
          <Route path="apps" element={<AppsContent />} />
          <Route path="payments" element={<PaymentsContent />} />
          <Route path="compare" element={<CompareContent />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;