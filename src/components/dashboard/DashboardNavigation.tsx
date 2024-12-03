import { Button } from "@/components/ui/button";
import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DashboardNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardNavigation = ({ activeTab, setActiveTab }: DashboardNavigationProps) => {
  return (
    <ScrollArea className="w-full sm:w-auto">
      <nav className="flex space-x-2 px-2 py-1 overflow-x-auto">
        <Button
          variant={activeTab === "dashboard" ? "default" : "ghost"}
          onClick={() => setActiveTab("dashboard")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <BarChart className="mr-2 h-4 w-4" />
          Tableau de bord
        </Button>
        <Button
          variant={activeTab === "payments" ? "default" : "ghost"}
          onClick={() => setActiveTab("payments")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <Receipt className="mr-2 h-4 w-4" />
          Paiements
        </Button>
        <Button
          variant={activeTab === "compare" ? "default" : "ghost"}
          onClick={() => setActiveTab("compare")}
          className="hover-scale whitespace-nowrap text-sm sm:text-base"
          size="sm"
        >
          <ArrowRightLeft className="mr-2 h-4 w-4" />
          Comparer
        </Button>
        <Button
          variant={activeTab === "apps" ? "default" : "ghost"}
          onClick={() => setActiveTab("apps")}
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