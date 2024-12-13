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
    children: [
      { path: "/", element: <Index /> },
      { 
        path: "/landing",
        element: <Suspense fallback={<LoadingSpinner />}><Landing /></Suspense>
      },
      {
        path: "/identification",
        element: <Suspense fallback={<LoadingSpinner />}><Identification /></Suspense>
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}><Onboarding /></Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: "/dashboard/*",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}><Dashboard /></Suspense>
          </ProtectedRoute>
        )
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Suspense fallback={<LoadingSpinner />}><Profile /></Suspense>
          </ProtectedRoute>
        )
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}