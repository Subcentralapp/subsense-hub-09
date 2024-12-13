import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SupportMessage } from "./SupportMessage";
import { useState } from "react";
import { navigationItems } from "../dashboard/navigationConfig";

export const MobileMenu = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    console.log("Navigation mobile vers:", path);
    navigate(path);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
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
              onClick={() => handleNavigation(item.path)}
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