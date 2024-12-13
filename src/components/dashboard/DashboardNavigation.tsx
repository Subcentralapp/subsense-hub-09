import { useLocation, useNavigate } from "react-router-dom";
import { navigationItems } from "./navigationConfig";
import { cn } from "@/lib/utils";

export const DashboardNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { activeTab?: string } | null;
  const activeTab = state?.activeTab || "dashboard";

  const handleNavigation = (tab: string) => {
    const path = tab === "dashboard" ? "/dashboard" : `/dashboard/${tab}`;
    navigate(path, { state: { activeTab: tab } });
  };

  return (
    <nav className="flex items-center justify-around gap-2 p-4">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.label}
            onClick={() => handleNavigation(item.tab)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
              "hover:bg-primary/10",
              activeTab === item.tab
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