import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import Applications from "@/pages/Applications";
import Subscriptions from "@/pages/Subscriptions";
import Settings from "@/pages/Settings";
import Invoices from "@/pages/Invoices";
import Budget from "@/pages/Budget";
import Statistics from "@/pages/Statistics";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "@/pages/Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/landing",
    element: <Landing />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/onboarding",
    element: <Onboarding />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/applications",
    element: <Applications />,
  },
  {
    path: "/subscriptions",
    element: <Subscriptions />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/budget",
    element: <Budget />,
  },
  {
    path: "/statistics",
    element: <Statistics />,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;