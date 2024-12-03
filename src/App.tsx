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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

// Layout component that includes Header
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16"> {/* Add padding to account for fixed header */}
        {children}
      </div>
    </div>
  );
};

// Wrap each route with the Layout component
const wrapWithLayout = (Component: React.ComponentType) => {
  return () => (
    <Layout>
      <Component />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/landing",
    element: wrapWithLayout(Landing)(),
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
    element: wrapWithLayout(Dashboard)(),
  },
  {
    path: "/app/applications",
    element: wrapWithLayout(Applications)(),
  },
  {
    path: "/applications",
    element: wrapWithLayout(Applications)(),
  },
  {
    path: "/subscriptions",
    element: wrapWithLayout(Subscriptions)(),
  },
  {
    path: "/settings",
    element: wrapWithLayout(Settings)(),
  },
  {
    path: "/invoices",
    element: wrapWithLayout(Invoices)(),
  },
  {
    path: "/budget",
    element: wrapWithLayout(Budget)(),
  },
  {
    path: "/statistics",
    element: wrapWithLayout(Statistics)(),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;