import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { BarChart, DollarSign, Plus, ArrowRightLeft, Lightbulb, Layout } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import SubscriptionList from "@/components/SubscriptionList";
import ComparisonSection from "@/components/ComparisonSection";
import RecommendationSection from "@/components/RecommendationSection";
import AdSpace from "@/components/AdSpace";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleAddSubscription = () => {
    toast({
      title: "Fonctionnalité à venir",
      description: "L'ajout d'abonnement sera bientôt disponible",
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6 fade-in">
            <DashboardStats />
            <SubscriptionList />
          </div>
        );
      case "compare":
        return <ComparisonSection />;
      case "recommendations":
        return <RecommendationSection />;
      case "ads":
        return <AdSpace />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-900">Mes Abonnements</h1>
          <Button onClick={handleAddSubscription} className="hover-scale">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter un abonnement
          </Button>
        </header>

        <nav className="flex space-x-4">
          <Button
            variant={activeTab === "dashboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("dashboard")}
            className="hover-scale"
          >
            <BarChart className="mr-2 h-4 w-4" />
            Tableau de bord
          </Button>
          <Button
            variant={activeTab === "compare" ? "default" : "ghost"}
            onClick={() => setActiveTab("compare")}
            className="hover-scale"
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            Comparer
          </Button>
          <Button
            variant={activeTab === "recommendations" ? "default" : "ghost"}
            onClick={() => setActiveTab("recommendations")}
            className="hover-scale"
          >
            <Lightbulb className="mr-2 h-4 w-4" />
            Recommandations
          </Button>
          <Button
            variant={activeTab === "ads" ? "default" : "ghost"}
            onClick={() => setActiveTab("ads")}
            className="hover-scale"
          >
            <Layout className="mr-2 h-4 w-4" />
            Publicités
          </Button>
        </nav>

        <main className="fade-in">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;