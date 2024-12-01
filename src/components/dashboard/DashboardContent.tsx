import DashboardStats from "@/components/DashboardStats";
import ApplicationList from "@/components/ApplicationList";
import SubscriptionList from "@/components/SubscriptionList";
import BudgetManager from "@/components/payment/budget/BudgetManager";
import RecommendationSection from "@/components/RecommendationSection";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";
import RandomAd from "@/components/RandomAd";

export const DashboardContent = () => {
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
      <RandomAd />
    </div>
  );
};