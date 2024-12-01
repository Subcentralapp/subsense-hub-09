import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import SubscriptionList from "@/components/SubscriptionList";
import ComparisonSection from "@/components/ComparisonSection";
import PaymentSection from "@/components/PaymentSection";
import RandomAd from "@/components/RandomAd";
import ApplicationImport from "@/components/ApplicationImport";
import ApplicationList from "@/components/ApplicationList";
import { Navbar } from "@/components/Navbar";
import BudgetManager from "@/components/payment/budget/BudgetManager";
import FeaturedApps from "@/components/FeaturedApps";
import RecommendationSection from "@/components/RecommendationSection";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6 fade-in">
            <DashboardStats />
            <div className="flex justify-end">
              <ApplicationList />
            </div>
            <SubscriptionList />
            <BudgetManager />
            <RecommendationSection />
            <TechnicalStackSuggestion />
            <ApplicationImport />
            <RandomAd />
          </div>
        );
      case "payments":
        return (
          <>
            <PaymentSection />
            <RandomAd />
          </>
        );
      case "compare":
        return (
          <>
            <ComparisonSection />
            <RandomAd />
          </>
        );
      case "apps":
        return (
          <>
            <FeaturedApps />
            <RandomAd />
          </>
        );
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

          <nav className="flex space-x-4">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              onClick={() => setActiveTab("dashboard")}
              className="hover-scale"
            >
              <BarChart className="mr-2 h-4 w-4" />
              Tableau de bord
            </Button>
            <Button
              variant={activeTab === "payments" ? "default" : "ghost"}
              onClick={() => setActiveTab("payments")}
              className="hover-scale"
            >
              <Receipt className="mr-2 h-4 w-4" />
              Paiements
            </Button>
            <Button
              variant={activeTab === "compare" ? "default" : "ghost"}
              onClick={() => setActiveTab("compare")}
              className="hover-scale"
            >
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Comparer
            </Button>
            <Button
              variant={activeTab === "apps" ? "default" : "ghost"}
              onClick={() => setActiveTab("apps")}
              className="hover-scale"
            >
              <AppWindow className="mr-2 h-4 w-4" />
              Nos Applications
            </Button>
          </nav>

          <main className="fade-in">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default Index;