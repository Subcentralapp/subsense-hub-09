import { UserNav } from "./UserNav";
import { NotificationBell } from "./notifications/NotificationBell";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Timer } from "lucide-react";

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
            src="/lovable-uploads/dd2572e4-8d74-4efc-bbd0-a2d9e911be06.png"
            alt="SubCentral Logo"
            className="h-20 w-auto object-contain"
          />
        </Button>
        
        <div className="flex-1 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-600">
            <Timer className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium">Offre limitée : Accès gratuit à vie pour les 1000 premiers inscrits ! 🚀</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationBell />
          <UserNav />
        </div>
      </div>
    </div>
  );
};