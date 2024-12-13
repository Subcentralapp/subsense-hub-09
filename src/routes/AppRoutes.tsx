import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "@/pages/Index";

const Landing = lazy(() => import("@/pages/Landing"));
const Identification = lazy(() => import("@/pages/Identification"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Profile = lazy(() => import("@/pages/Profile"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));

function Layout() {
  return (
    <div className="min-h-screen w-full bg-background font-sans antialiased flex flex-col overflow-x-hidden">
      <Header />
      <main className="flex-grow w-full">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { 
        path: "/", 
        element: <Index /> 
      },
      { 
        path: "/landing",
        element: <Landing />
      },
      {
        path: "/identification",
        element: <Identification />
      },
      {
        path: "/auth",
        element: <Identification />
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        )
      },
      {
        path: "/dashboard/*",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  }
];

function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Oops!</h1>
        <p className="text-muted-foreground">
          La page que vous recherchez n'existe pas.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export const router = createBrowserRouter(routes);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}