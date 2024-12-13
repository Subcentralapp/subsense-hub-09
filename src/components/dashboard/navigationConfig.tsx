import { LayoutDashboard, AppWindow, Receipt, Scale } from "lucide-react";

export const navigationItems = [
  {
    label: "Tableau de bord",
    icon: LayoutDashboard,
    path: "/dashboard"
  },
  {
    label: "Applications",
    icon: AppWindow,
    path: "/dashboard/apps"
  },
  {
    label: "Paiements",
    icon: Receipt,
    path: "/dashboard/payments"
  },
  {
    label: "Comparer",
    icon: Scale,
    path: "/dashboard/compare"
  }
];