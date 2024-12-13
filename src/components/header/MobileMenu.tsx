import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BarChart, Receipt, ArrowRightLeft, AppWindow } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SupportMessage } from "./SupportMessage";
import { useState } from "react";

const navigationItems = [
  { icon: BarChart, label: "Tableau de bord", path: "/dashboard", tab: "dashboard" },
  { icon: Receipt, label: "Paiements", path: "/dashboard", tab: "payments" },
  { icon: ArrowRightLeft, label: "Comparer", path: "/dashboard", tab: "compare" },
  { icon: AppWindow, label: "Applications", path: "/dashboard", tab: "apps" },
];

export const MobileMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string, tab: string) => {
    console.log(`MobileMenu - Navigating to ${path} with tab ${tab}`);
    navigate(path, { state: { activeTab: tab } });
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
              key={item.tab}
              onClick={() => handleNavigation(item.path, item.tab)}
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