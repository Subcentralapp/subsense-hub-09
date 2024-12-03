import { UserNav } from "./UserNav";
import { NotificationBell } from "./notifications/NotificationBell";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="flex flex-col sm:flex-row h-auto sm:h-28 items-center px-4 py-4 sm:py-0">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-0 hover:bg-transparent mb-4 sm:mb-0"
          onClick={() => navigate("/")}
        >
          <img 
            src="/lovable-uploads/dd2572e4-8d74-4efc-bbd0-a2d9e911be06.png"
            alt="SubCentral Logo"
            className="h-16 sm:h-20 w-auto object-contain"
          />
        </Button>
        
        <div className="flex-1 flex justify-center mb-4 sm:mb-0">
          <p className="text-base sm:text-lg font-semibold text-primary animate-wave text-center">
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