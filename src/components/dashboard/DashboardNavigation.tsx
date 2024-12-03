import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CreditCard,
  Settings,
  FileText,
  PiggyBank,
  BarChart3,
  Apps,
  Boxes
} from "lucide-react";

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Applications', href: '/applications', icon: Apps },
  { name: 'Abonnements', href: '/subscriptions', icon: Boxes },
  { name: 'Paiements', href: '/invoices', icon: CreditCard },
  { name: 'Budget', href: '/budget', icon: PiggyBank },
  { name: 'Statistiques', href: '/statistics', icon: BarChart3 },
  { name: 'Paramètres', href: '/settings', icon: Settings },
];

export const DashboardNavigation = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-2">
      {navigation.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
              location.pathname === item.href && "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};