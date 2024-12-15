import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Augmenter le staleTime pour réduire les requêtes inutiles
      staleTime: 10 * 60 * 1000, // 10 minutes au lieu de 5
      // Garder les données en cache plus longtemps
      gcTime: 60 * 60 * 1000, // 1 heure au lieu de 30 minutes
      // Désactiver le refetch automatique sur la fenêtre focus pour les données qui changent peu
      refetchOnWindowFocus: false,
      // Réduire le nombre de tentatives en cas d'échec
      retry: 1,
      // Ajouter une gestion d'erreur par défaut
      meta: {
        errorHandler: (error: Error) => {
          console.error("Query error:", error);
        }
      }
    },
    mutations: {
      // Optimiser les mutations
      retry: 1,
      // Ajouter une gestion d'erreur par défaut pour les mutations
      meta: {
        errorHandler: (error: Error) => {
          console.error("Mutation error:", error);
        }
      }
    }
  },
});

// Préchargement optimisé des requêtes importantes
export const prefetchQueries = async () => {
  console.log("Prefetching important queries...");
  
  try {
    // Précharger les requêtes communes avec un staleTime plus long
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
          console.log("Prefetching subscriptions...");
          return [];
        },
        staleTime: 30 * 60 * 1000, // 30 minutes pour les données qui changent peu
      }),
      queryClient.prefetchQuery({
        queryKey: ['applications'],
        queryFn: async () => {
          console.log("Prefetching applications...");
          return [];
        },
        staleTime: 60 * 60 * 1000, // 1 heure pour les données statiques
      })
    ]);
    
    console.log("Prefetching completed successfully");
  } catch (error) {
    console.error("Error during prefetching:", error);
  }
};