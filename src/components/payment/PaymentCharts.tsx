import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subMonths } from "date-fns";

const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#D6BCFA', '#E5DEFF'];

const PaymentCharts = () => {
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

  const currentMonthTotal = subscriptions?.reduce((total, sub) => total + Number(sub.price), 0) || 0;
  const previousMonthTotal = currentMonthTotal * 1.2;

  const savings = previousMonthTotal - currentMonthTotal;
  const savingsPercentage = ((savings / previousMonthTotal) * 100).toFixed(1);

  const comparisonData = [
    {
      name: format(subMonths(new Date(), 1), 'MMMM'),
      montant: previousMonthTotal.toFixed(2),
      fill: '#F97316'
    },
    {
      name: format(new Date(), 'MMMM'),
      montant: currentMonthTotal.toFixed(2),
      fill: '#9b87f5'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-neutral-light">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-lg font-semibold text-primary">
            {`${payload[0].value}€`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="glass-card p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Analyse des Dépenses
        </h3>
        {savings > 0 && (
          <div className="bg-neutral-light px-4 py-2 rounded-full">
            <span className="text-secondary font-medium">
              Économies: {savings.toFixed(2)}€
            </span>
            <span className="text-primary ml-2 font-bold">
              ({savingsPercentage}%)
            </span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white/50 rounded-xl p-6 hover-scale">
          <h4 className="text-sm font-medium mb-6 text-center text-secondary">
            Répartition par Catégorie
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={5}
                >
                  {pieData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/50 rounded-xl p-6 hover-scale">
          <h4 className="text-sm font-medium mb-6 text-center text-secondary">
            Comparaison Mois N / N-1
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} barGap={8}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#7E69AB' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#7E69AB' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="montant" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={80}
                >
                  {comparisonData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.fill}
                      className="hover:opacity-80 transition-opacity"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCharts;