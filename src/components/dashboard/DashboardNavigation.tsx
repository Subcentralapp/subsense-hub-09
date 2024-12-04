import { useLocation } from "react-router-dom";
import { navigationItems } from "./navigationConfig";
import { cn } from "@/lib/utils";

export const DashboardNavigation = () => {
  const location = useLocation();
  const state = location.state as { activeTab?: string } | null;
  const activeTab = state?.activeTab || "dashboard";

  return (
    <nav className="flex items-center justify-around sm:flex-col sm:items-start sm:space-y-1">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => item.onClick(item.tab)}
            className={cn(
              "p-2 sm:p-0 sm:flex sm:items-center sm:gap-3",
              "transition-colors hover:text-primary",
              activeTab === item.tab
                ? "text-primary"
                : "text-muted-foreground"
            )}
            aria-label={item.label}
          >
            <Icon className="h-5 w-5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline text-sm font-medium">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};