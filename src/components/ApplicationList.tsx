import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import ApplicationDialog from "./dialog/ApplicationDialog";
import { Application } from "@/types/application";
import { useNavigate } from "react-router-dom";
import SubscriptionCustomizeDialog from "./dialog/SubscriptionCustomizeDialog";
import { useState } from "react";
import { useApplicationSearch } from "@/hooks/useApplicationSearch";
import { useQuery } from "@tanstack/react-query";
import { usePerformanceMonitoring } from "@/hooks/usePerformanceMonitoring";

const ApplicationList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { fetchApplications } = useApplicationSearch();
  const { logPerformance } = usePerformanceMonitoring();

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      console.log("📱 Fetching applications...");
      const startTime = performance.now();
      try {
        const apps = await fetchApplications();
        console.log("✅ Applications fetched successfully:", apps?.length);
        logPerformance({
          endpoint: "fetchApplications",
          startTime,
          statusCode: 200,
          metadata: { applicationsCount: apps?.length }
        });
        return apps;
      } catch (error) {
        console.error("❌ Error fetching applications:", error);
        logPerformance({
          endpoint: "fetchApplications",
          startTime,
          statusCode: 500,
          error
        });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 2
  });

  const handleAddSubscription = async (app: Application) => {
    console.log("🎯 Opening customization dialog for:", app.name);
    setSelectedApp(app);
  };

  const handleConfirmSubscription = async (
    price: number,
    nextBilling: Date,
    isTrial: boolean,
    trialEndDate: Date | null
  ) => {
    const startTime = performance.now();
    try {
      console.log("🔄 Checking authentication...");
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        console.log("❌ User not authenticated, redirecting to auth");
        navigate("/auth");
        return;
      }

      if (!selectedApp) {
        console.log("❌ No app selected");
        return;
      }

      console.log("📝 Adding subscription for user:", user.id);

      const { data, error } = await supabase.from("subscriptions").insert({
        name: selectedApp.name,
        price: price,
        category: selectedApp.category,
        next_billing: nextBilling.toISOString(),
        description: selectedApp.description,
        user_id: user.id,
        is_trial: isTrial,
        trial_end_date: trialEndDate?.toISOString() || null,
      }).select().single();

      if (error) {
        console.error("❌ Error inserting subscription:", error);
        throw error;
      }

      console.log("✅ Subscription added successfully:", data);

      // Mise à jour optimiste du cache
      queryClient.setQueryData(["subscriptions"], (oldData: any) => {
        if (!oldData) return { subscriptions: [data], total: 1, totalPages: 1 };
        return {
          ...oldData,
          subscriptions: [data, ...(oldData.subscriptions || [])],
          total: (oldData.total || 0) + 1,
        };
      });

      logPerformance({
        endpoint: "addSubscription",
        startTime,
        statusCode: 200,
        metadata: { appName: selectedApp.name }
      });

      toast({
        title: "Abonnement ajouté",
        description: `L'abonnement à ${selectedApp.name} a été ajouté avec succès${
          isTrial ? " avec une période d'essai" : ""
        }.`,
      });

      setSelectedApp(null);
      setIsDialogOpen(false);
      navigate("/dashboard");
    } catch (error: any) {
      logPerformance({
        endpoint: "addSubscription",
        startTime,
        statusCode: 500,
        error
      });

      console.error("❌ Error adding subscription:", error);
      toast({
        title: "Erreur",
        description: error?.message || "Une erreur est survenue lors de l'ajout de l'abonnement.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <ApplicationDialog
        applications={applications}
        isLoading={isLoading}
        onAddSubscription={handleAddSubscription}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <SubscriptionCustomizeDialog
        app={selectedApp}
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        onConfirm={handleConfirmSubscription}
      />
    </>
  );
};

export default ApplicationList;