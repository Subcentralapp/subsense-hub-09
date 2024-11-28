import { Card } from "@/components/ui/card";
import { DollarSign, TrendingUp, Calendar, Award } from "lucide-react";

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Coût Mensuel</p>
            <p className="text-2xl font-semibold">89,99 €</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-secondary/10 rounded-full">
            <Calendar className="h-6 w-6 text-secondary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Coût Annuel</p>
            <p className="text-2xl font-semibold">1079,88 €</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-neutral/10 rounded-full">
            <TrendingUp className="h-6 w-6 text-neutral" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Abonnements</p>
            <p className="text-2xl font-semibold">8</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 glass-card hover-scale">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Plus Coûteux</p>
            <p className="text-2xl font-semibold">Netflix</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardStats;