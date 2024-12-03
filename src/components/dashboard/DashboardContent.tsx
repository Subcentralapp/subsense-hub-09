import DashboardStats from "@/components/DashboardStats";
import SubscriptionList from "@/components/SubscriptionList";
import BudgetManager from "@/components/payment/budget/BudgetManager";
import DetailedStats from "@/components/statistics/DetailedStats";
import NuitisPromo from "@/components/promo/NuitisPromo";

export const DashboardContent = () => {
  return (
    <div className="space-y-6 fade-in">
      <DashboardStats />
      <SubscriptionList />
      <BudgetManager />
      <DetailedStats />
      <NuitisPromo />
    </div>
  );
};