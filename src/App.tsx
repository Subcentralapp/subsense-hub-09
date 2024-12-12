import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import Onboarding from "./pages/Onboarding";

const queryClient = new QueryClient();

function Layout() {
  return (
    <div className="min-h-screen w-full bg-background font-sans antialiased flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      {
        path: "/landing",
        element: <Landing />,
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
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="w-full min-h-screen overflow-x-hidden">
          <RouterProvider router={router} />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;