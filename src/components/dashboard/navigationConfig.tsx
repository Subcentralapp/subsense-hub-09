import { LayoutDashboard, Apps, Receipt, Scale } from "lucide-react";

export const navigationConfig = [
  {
    title: "Tableau de bord",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Applications",
    href: "/dashboard/apps",
    icon: Apps,
  },
  {
    title: "Paiements",
    href: "/dashboard/payments",
    icon: Receipt,
  },
  {
    title: "Comparer",
    href: "/dashboard/compare",
    icon: Scale,
  },
];