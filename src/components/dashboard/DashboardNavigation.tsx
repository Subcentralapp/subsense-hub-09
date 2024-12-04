import { useLocation } from "react-router-dom";
import { navigationItems } from "./DashboardContent";
import { cn } from "@/lib/utils";

export const DashboardNavigation = () => {
  const location = useLocation();
  const state = location.state as { activeTab?: string } | null;
  const activeTab = state?.activeTab || "dashboard";

  return (
    <nav className="flex flex-col space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => item.onClick(item.tab)}
            className={cn(
              "flex items-center gap-3 text-sm font-medium transition-colors hover:text-primary",
              activeTab === item.tab
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};