import { useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "./navigationConfig";
import { cn } from "@/lib/utils";

export const DashboardNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    console.log("Navigation vers:", path);
    navigate(path);
  };

  return (
    <nav className="flex items-center justify-around gap-2 p-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentPath === item.path;
        
        return (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.path)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
              "hover:bg-primary/10",
              isActive
                ? "text-primary bg-primary/5"
                : "text-muted-foreground"
            )}
            aria-label={item.label}
          >
            <Icon className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};