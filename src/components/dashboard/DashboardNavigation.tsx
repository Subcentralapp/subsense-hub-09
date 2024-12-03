import { Button } from "@/components/ui/button";
import { BarChart, Receipt, ArrowRightLeft, AppWindow, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface DashboardNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const DashboardNavigation = ({ activeTab, setActiveTab }: DashboardNavigationProps) => {
  const navigationItems = [
    { id: "dashboard", label: "Tableau de bord", icon: BarChart },
    { id: "payments", label: "Paiements", icon: Receipt },
    { id: "compare", label: "Comparer", icon: ArrowRightLeft },
    { id: "apps", label: "Applications", icon: AppWindow },
  ];

  const NavigationContent = () => (
    <>
      {navigationItems.map((item) => (
        <Button
          key={item.id}
          variant={activeTab === item.id ? "default" : "ghost"}
          onClick={() => setActiveTab(item.id)}
          className="hover-scale whitespace-nowrap text-sm sm:text-base w-full justify-start"
          size="sm"
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.label}
        </Button>
      ))}
    </>
  );

  return (
    <div className="w-full">
      {/* Mobile Navigation */}
      <div className="sm:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <nav className="flex flex-col space-y-2 mt-6">
              <NavigationContent />
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden sm:block">
        <ScrollArea className="w-full">
          <nav className="flex space-x-2 px-2 py-1">
            <NavigationContent />
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};