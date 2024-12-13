import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";

export const navigationItems = [
  {
    tab: "dashboard",
    label: "Tableau de bord",
    icon: BarChart,
    path: "/dashboard"
  },
  {
    tab: "payments",
    label: "Paiements",
    icon: Receipt,
    path: "/dashboard"
  },
  {
    tab: "compare",
    label: "Comparer",
    icon: ArrowRightLeft,
    path: "/dashboard"
  },
  {
    tab: "apps",
    label: "Applications",
    icon: AppWindow,
    path: "/dashboard"
  }
];