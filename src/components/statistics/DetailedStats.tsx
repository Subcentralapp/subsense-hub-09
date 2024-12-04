import { Card } from "@/components/ui/card";
import { useStatsData } from "./hooks/useStatsData";
import { StatsExport } from "./StatsExport";
import { StatsCard } from "./StatsCard";

const DetailedStats = () => {
  const { data: subscriptions } = useStatsData();

  const stats = {
    totalMonthly: subscriptions?.reduce((sum, sub) => sum + Number(sub.price), 0) || 0,
    totalYearly: (subscriptions?.reduce((sum, sub) => sum + Number(sub.price), 0) || 0) * 12,
    averagePerSub: subscriptions?.length ? 
      (subscriptions.reduce((sum, sub) => sum + Number(sub.price), 0) / subscriptions.length) : 0,
    categoryBreakdown: subscriptions?.reduce((acc: Record<string, number>, sub) => {
      const category = sub.category || 'Non catégorisé';
      acc[category] = (acc[category] || 0) + Number(sub.price);
      return acc;
    }, {}),
    totalSubscriptions: subscriptions?.length || 0,
    trialSubscriptions: subscriptions?.filter(sub => sub.is_trial).length || 0,
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border border-neutral-light shadow-lg space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Statistiques Détaillées</h2>
        <StatsExport stats={stats} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Coûts">
          <p className="text-sm text-gray-600">
            Total Mensuel: <span className="font-semibold text-primary">{stats.totalMonthly.toFixed(2)}€</span>
          </p>
          <p className="text-sm text-gray-600">
            Total Annuel: <span className="font-semibold text-primary">{stats.totalYearly.toFixed(2)}€</span>
          </p>
          <p className="text-sm text-gray-600">
            Moyenne/Abonnement: <span className="font-semibold text-primary">{stats.averagePerSub.toFixed(2)}€</span>
          </p>
        </StatsCard>

        <StatsCard title="Abonnements">
          <p className="text-sm text-gray-600">
            Total: <span className="font-semibold text-primary">{stats.totalSubscriptions}</span>
          </p>
          <p className="text-sm text-gray-600">
            En période d'essai: <span className="font-semibold text-primary">{stats.trialSubscriptions}</span>
          </p>
        </StatsCard>

        <StatsCard title="Répartition par Catégorie">
          {Object.entries(stats.categoryBreakdown || {}).map(([category, amount]) => (
            <p key={category} className="text-sm text-gray-600">
              {category}: <span className="font-semibold text-primary">{Number(amount).toFixed(2)}€</span>
            </p>
          ))}
        </StatsCard>
      </div>
    </Card>
  );
};

export default DetailedStats;