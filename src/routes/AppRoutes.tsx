import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "@/pages/Index";
import Landing from "@/pages/Landing";
import Identification from "@/pages/Identification";
import Dashboard from "@/pages/Dashboard";
import Profile from "@/pages/Profile";
import Onboarding from "@/pages/Onboarding";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/landing", element: <Landing /> },
      { path: "/identification", element: <Identification /> },
      { path: "/auth", element: <Identification /> },
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
]);

function ErrorBoundary() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Oops!</h1>
        <p className="text-gray-600">Une erreur est survenue.</p>
      </div>
    </div>
  );
}

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};