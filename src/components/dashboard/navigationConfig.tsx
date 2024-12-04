import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";

export const navigationItems = [
  {
    tab: "dashboard",
    label: "Tableau de bord",
    icon: BarChart,
    onClick: (tab: string) => {
      window.history.pushState({ activeTab: tab }, "", "");
    }
  },
  {
    tab: "payments",
    label: "Paiements",
    icon: Receipt,
    onClick: (tab: string) => {
      window.history.pushState({ activeTab: tab }, "", "");
    }
  },
  {
    tab: "compare",
    label: "Comparer",
    icon: ArrowRightLeft,
    onClick: (tab: string) => {
      window.history.pushState({ activeTab: tab }, "", "");
    }
  },
  {
    tab: "apps",
    label: "Applications",
    icon: AppWindow,
    onClick: (tab: string) => {
      window.history.pushState({ activeTab: tab }, "", "");
    }
  }
];