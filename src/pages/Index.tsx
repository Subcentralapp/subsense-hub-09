import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";
import { CompareContent } from "@/components/dashboard/CompareContent";
import { AppsContent } from "@/components/dashboard/AppsContent";
import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-neutral-light p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <header className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-gray-900">Mes Abonnements</h1>
          </header>

          <DashboardNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <main className="fade-in">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;