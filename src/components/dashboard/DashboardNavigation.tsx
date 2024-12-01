import { Button } from "@/components/ui/button";
import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardNavigation = ({ activeTab, onTabChange }: DashboardNavigationProps) => {
  return (
    <nav className="flex space-x-4">
      <Button
        variant={activeTab === "dashboard" ? "default" : "ghost"}
        onClick={() => onTabChange("dashboard")}
        className="hover-scale"
      >
        <BarChart className="mr-2 h-4 w-4" />
        Tableau de bord
      </Button>
      <Button
        variant={activeTab === "payments" ? "default" : "ghost"}
        onClick={() => onTabChange("payments")}
        className="hover-scale"
      >
        <Receipt className="mr-2 h-4 w-4" />
        Paiements
      </Button>
      <Button
        variant={activeTab === "compare" ? "default" : "ghost"}
        onClick={() => onTabChange("compare")}
        className="hover-scale"
      >
        <ArrowRightLeft className="mr-2 h-4 w-4" />
        Comparer
      </Button>
      <Button
        variant={activeTab === "apps" ? "default" : "ghost"}
        onClick={() => onTabChange("apps")}
        className="hover-scale"
      >
        <AppWindow className="mr-2 h-4 w-4" />
        Nos Applications
      </Button>
    </nav>
  );
};