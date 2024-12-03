import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SupportMessage } from "./SupportMessage";

const navigationItems = [
  { icon: BarChart, label: "Tableau de bord", path: "/dashboard", tab: "dashboard" },
  { icon: Receipt, label: "Paiements", path: "/dashboard", tab: "payments" },
  { icon: ArrowRightLeft, label: "Comparer", path: "/dashboard", tab: "compare" },
  { icon: AppWindow, label: "Applications", path: "/dashboard", tab: "apps" },
];

export const MobileMenu = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string, tab: string) => {
    navigate(path, { state: { activeTab: tab } });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent>
        <nav className="flex flex-col gap-4 mt-8">
          {navigationItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => handleNavigation(item.path, item.tab)}
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors text-left"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </button>
          ))}
          <SupportMessage />
        </nav>
      </SheetContent>
    </Sheet>
  );
};