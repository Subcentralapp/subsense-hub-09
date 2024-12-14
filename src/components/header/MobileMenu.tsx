import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SupportMessage } from "./SupportMessage";
import { useState } from "react";

const navigationItems = [
  { icon: BarChart, label: "Tableau de bord", path: "/dashboard", tab: "dashboard" },
  { icon: Receipt, label: "Paiements", path: "/dashboard/payments", tab: "payments" },
  { icon: ArrowRightLeft, label: "Comparer", path: "/dashboard/compare", tab: "compare" },
  { icon: AppWindow, label: "Applications", path: "/dashboard/apps", tab: "apps" },
];

export const MobileMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    console.log(`MobileMenu - Navigating to ${path}`);
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2" aria-label="Menu principal">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col gap-4 mt-8">
          {navigationItems.map((item) => (
            <button 
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-3 text-lg font-medium hover:text-primary transition-colors text-left w-full px-4 py-2 rounded-lg hover:bg-gray-100"
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