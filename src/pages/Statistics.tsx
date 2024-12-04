import { Card } from "@/components/ui/card";
import { StatsExport } from "@/components/statistics/StatsExport";

const Statistics = () => {
  const mockStats = {
    totalMonthly: 150,
    totalYearly: 1800,
    averagePerSub: 25,
    categoryBreakdown: {
      "Streaming": 50,
      "Cloud": 30,
      "Other": 70
    },
    totalSubscriptions: 6,
    trialSubscriptions: 1
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <div className="space-y-4">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">Statistiques</h1>
          <StatsExport stats={mockStats} />
        </div>
        <Card className="p-4 sm:p-6">
          <p>Statistiques détaillées</p>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;