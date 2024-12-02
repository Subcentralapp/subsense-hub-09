import { UserNav } from "./UserNav";
import { NotificationBell } from "./notifications/NotificationBell";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="flex h-24 items-center px-4">
        <Button
          variant="ghost"
          className="flex items-center space-x-2 px-0 hover:bg-transparent"
          onClick={() => navigate("/")}
        >
          <img 
            src="/lovable-uploads/8e3958b8-cb49-4a9f-8d56-4c994cc8c3f0.png"
            alt="SubCentral Logo"
            className="h-16 w-auto object-contain"
          />
        </Button>
        <div className="ml-auto flex items-center space-x-4">
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </div>
  );
};