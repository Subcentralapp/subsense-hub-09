import { UserNav } from "./UserNav";
import { NotificationBell } from "./notifications/NotificationBell";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="flex h-28 items-center px-4">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-0 hover:bg-transparent"
          onClick={() => navigate("/")}
        >
          <img 
            src="/lovable-uploads/0b3b4ad4-cd12-41de-9169-ce328cdf89ff.png"
            alt="SubCentral Logo"
            className="h-20 w-auto object-contain"
          />
        </Button>
        
        <div className="flex-1 flex justify-center">
          <p className="text-lg font-semibold text-primary animate-wave">
            L'application N°1 pour faire des économies
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </div>
  );
};