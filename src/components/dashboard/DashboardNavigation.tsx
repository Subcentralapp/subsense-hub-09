import { Button } from "@/components/ui/button";
import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const DashboardNavigation = ({ activeTab, onTabChange }: DashboardNavigationProps) => {
  return (
    <ScrollArea className="w-full sm:w-auto">
      <nav className="flex space-x-2 px-2 py-1 overflow-x-auto">
        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          onClick={() => onTabChange("dashboard")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <BarChart className="mr-2 h-4 w-4" />
          Tableau de bord
        </Button>
        <Button
          variant={activeTab === "payments" ? "default" : "ghost"}
          onClick={() => onTabChange("payments")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <Receipt className="mr-2 h-4 w-4" />
          Paiements
        </Button>
        <Button
          variant={activeTab === "compare" ? "default" : "ghost"}
          onClick={() => onTabChange("compare")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Comparer
        </Button>
        <Button
          variant={activeTab === "apps" ? "default" : "ghost"}
          onClick={() => onTabChange("apps")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <AppWindow className="mr-2 h-4 w-4" />
          Applications
        </Button>
      </nav>
    </ScrollArea>
  );
};