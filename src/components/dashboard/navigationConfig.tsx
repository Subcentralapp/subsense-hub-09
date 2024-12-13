import { BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";

export const navigationItems = [
  {
    label: "Tableau de bord",
    icon: BarChart,
    path: "/dashboard"
  },
  {
    label: "Paiements",
    icon: Receipt,
    path: "/dashboard/payments"
  },
  {
    label: "Comparer",
    icon: ArrowRightLeft,
    path: "/dashboard/compare"
  },
  {
    label: "Applications",
    icon: AppWindow,
    path: "/dashboard/apps"
  }
];