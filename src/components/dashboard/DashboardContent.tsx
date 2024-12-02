import DashboardStats from "@/components/DashboardStats";
import SubscriptionList from "@/components/SubscriptionList";
import BudgetManager from "@/components/payment/budget/BudgetManager";
import RecommendationSection from "@/components/RecommendationSection";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";
import DetailedStats from "@/components/statistics/DetailedStats";
import AdCarousel from "@/components/AdCarousel";
import RandomAd from "@/components/RandomAd";

export const DashboardContent = () => {
  return (
    <div className="space-y-6 fade-in">
      <DashboardStats />
      <SubscriptionList />
      <BudgetManager />
      <DetailedStats />
      <RecommendationSection />
      <TechnicalStackSuggestion />
      <AdCarousel />
      <RandomAd />
    </div>
  );
};