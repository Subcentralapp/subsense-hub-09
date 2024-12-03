import { UserNav } from "./UserNav";
import { NotificationBell } from "./notifications/NotificationBell";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: 'Tableau de bord', href: '/dashboard' },
  { name: 'Applications', href: '/applications' },
  { name: 'Abonnements', href: '/subscriptions' },
  { name: 'Paiements', href: '/invoices' },
];

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-0 hover:bg-transparent"
          onClick={() => navigate("/")}
        >
          <img 
            src="/lovable-uploads/dd2572e4-8d74-4efc-bbd0-a2d9e911be06.png"
            alt="SubCentral Logo"
            className="h-12 w-auto object-contain"
          />
        </Button>
        
        <nav className="flex-1 flex justify-center space-x-4">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className={cn(
                "text-base",
                location.pathname === item.href && "bg-accent"
              )}
              onClick={() => navigate(item.href)}
            >
              {item.name}
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </div>
  );
};