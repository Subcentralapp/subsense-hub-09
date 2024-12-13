import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Retry failed requests only once
      retry: 1,
      // Don't refetch on window focus for better performance
      refetchOnWindowFocus: false,
      // Cache data for 5 minutes by default
      staleTime: 5 * 60 * 1000,
      // Keep unused data in cache for 30 minutes
      gcTime: 30 * 60 * 1000,
      // Add default error handling using onSettled
      onSettled: (data, error) => {
        if (error) {
          console.error("Query error:", error);
        }
      }
    },
    mutations: {
      // Retry failed mutations once
      retry: 1,
      // Add default error handling using onSettled
      onSettled: (data, error) => {
        if (error) {
          console.error("Mutation error:", error);
        }
      }
    }
  },
});

// Prefetch helper function
export const prefetchQueries = async () => {
  console.log("Prefetching important queries...");
  
  try {
    // Prefetch common queries
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
          console.log("Prefetching subscriptions...");
          return [];
        },
      }),
      queryClient.prefetchQuery({
        queryKey: ['applications'],
        queryFn: async () => {
          console.log("Prefetching applications...");
          return [];
        },
      })
    ]);
    
    console.log("Prefetching completed successfully");
  } catch (error) {
    console.error("Error during prefetching:", error);
  }
};