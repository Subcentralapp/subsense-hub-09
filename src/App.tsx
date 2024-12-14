import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRoutes } from "@/routes/AppRoutes";

// Configure QueryClient with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
      retry: (failureCount, error) => {
        // Ne pas réessayer si l'erreur est liée à l'authentification
        if (error instanceof Error && error.message.includes('Authentication')) {
          return false;
        }
        return failureCount < 1;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      // Ajouter un timeout pour éviter les chargements infinis
      queryFn: async (context) => {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timeout'));
          }, 10000); // 10 secondes timeout
        });

        try {
          const result = await Promise.race([
            context.queryFn(context.queryKey),
            timeoutPromise
          ]);
          return result;
        } catch (error) {
          console.error('Query error:', error);
          throw error;
        }
      }
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <div className="w-full min-h-screen overflow-x-hidden">
          <AppRoutes />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;