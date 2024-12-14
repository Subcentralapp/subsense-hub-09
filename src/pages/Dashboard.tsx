import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  console.log("Dashboard - Current location:", location.pathname);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="space-y-4 sm:space-y-8">
        <DashboardNavigation />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;