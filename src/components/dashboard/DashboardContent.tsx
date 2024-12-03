import DashboardStats from "@/components/DashboardStats";
import SubscriptionList from "@/components/SubscriptionList";
import BudgetManager from "@/components/payment/budget/BudgetManager";
import RecommendationSection from "@/components/RecommendationSection";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";
import DetailedStats from "@/components/statistics/DetailedStats";

export const DashboardContent = () => {
  return (
    <div className="space-y-6 fade-in">
      <DashboardStats />
      <SubscriptionList />
      <BudgetManager />
      <DetailedStats />
      <RecommendationSection />
      <TechnicalStackSuggestion />
    </div>
  );
};