import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const usePerformanceMonitoring = () => {
  const { toast } = useToast();

  const logPerformance = useCallback(async ({
    endpoint,
    startTime,
    statusCode,
    error = null,
    metadata = {}
  }: {
    endpoint: string;
    startTime: number;
    statusCode: number;
    error?: Error | null;
    metadata?: Record<string, any>;
  }) => {
    try {
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      const memoryUsage = performance.memory?.usedJSHeapSize || null;

      console.log(`Performance monitoring - Endpoint: ${endpoint}, Response time: ${responseTime}ms`);

      const { data: { user } } = await supabase.auth.getUser();
      
      const { error: logError } = await supabase.functions.invoke('monitor-performance', {
        body: {
          userId: user?.id,
          endpoint,
          responseTime,
          memoryUsage,
          statusCode,
          errorMessage: error?.message,
          metadata: {
            ...metadata,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        }
      });

      if (logError) {
        console.error('Error logging performance:', logError);
        if (responseTime > 5000) { // Alert on slow responses
          toast({
            title: "Performance Warning",
            description: "The application is running slower than usual. Please try again later.",
            variant: "destructive",
          });
        }
      }
    } catch (err) {
      console.error('Error in performance monitoring:', err);
    }
  }, [toast]);

  return { logPerformance };
};