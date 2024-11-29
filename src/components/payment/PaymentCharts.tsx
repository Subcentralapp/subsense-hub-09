import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Button } from "@/components/ui/button";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const PaymentCharts = () => {
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly'>('monthly');

  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      console.log("Fetching subscriptions for charts...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found, returning empty array");
        return [];
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }

      console.log("Fetched subscriptions for charts:", data);
      return data;
    }
  });

  // Préparer les données pour le graphique en camembert (répartition par catégorie)
  const pieData = subscriptions?.reduce((acc: any[], sub) => {
    const existingCategory = acc.find(item => item.name === (sub.category || 'Autre'));
    if (existingCategory) {
      existingCategory.value += Number(sub.price);
    } else {
      acc.push({
        name: sub.category || 'Autre',
        value: Number(sub.price)
      });
    }
    return acc;
  }, []) || [];

  // Préparer les données pour le graphique en barres (comparaison mensuelle/annuelle)
  const barData = subscriptions?.reduce((acc: any[], sub) => {
    const monthlyAmount = Number(sub.price);
    const yearlyAmount = monthlyAmount * 12;
    
    return [
      {
        name: 'Mensuel',
        montant: monthlyAmount.toFixed(2)
      },
      {
        name: 'Annuel',
        montant: yearlyAmount.toFixed(2)
      }
    ];
  }, []) || [];

  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Analyse des Dépenses</h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'monthly' ? 'default' : 'outline'}
            onClick={() => setViewMode('monthly')}
            size="sm"
          >
            Mensuel
          </Button>
          <Button
            variant={viewMode === 'yearly' ? 'default' : 'outline'}
            onClick={() => setViewMode('yearly')}
            size="sm"
          >
            Annuel
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-[300px]">
          <h4 className="text-sm font-medium mb-4 text-center">Répartition par Catégorie</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="h-[300px]">
          <h4 className="text-sm font-medium mb-4 text-center">Comparaison Mensuelle/Annuelle</h4>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="montant" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCharts;