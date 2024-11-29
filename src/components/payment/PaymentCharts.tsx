import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format, subMonths } from "date-fns";
import { fr } from "date-fns/locale";

const COLORS = ['#9b87f5', '#7E69AB', '#E5DEFF', '#D6BCFA'];

const PaymentCharts = () => {
  const { data: subscriptions } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
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

  const monthlyData = [
    {
      name: format(subMonths(new Date(), 1), 'MMMM', { locale: fr }),
      montant: previousMonthTotal.toFixed(2),
      fill: '#F97316'
    },
    {
      name: format(new Date(), 'MMMM', { locale: fr }),
      montant: currentMonthTotal.toFixed(2),
      fill: '#9b87f5'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 p-4 rounded-lg shadow-lg border border-neutral-200">
          <p className="text-sm font-medium text-neutral-600">{label}</p>
          <p className="text-lg font-semibold text-primary">
            {`${Number(payload[0].value).toFixed(2)}€`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-xl rounded-xl p-8 space-y-8 border border-neutral-100">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Analyse des Dépenses
        </h3>
        {savings > 0 && (
          <div className="bg-neutral-light px-6 py-3 rounded-full shadow-sm border border-neutral-200">
            <span className="text-secondary font-medium mr-2">
              Économies réalisées:
            </span>
            <span className="text-primary font-bold">
              {savings.toFixed(2)}€ ({savingsPercentage}%)
            </span>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 transition-all duration-300 hover:shadow-lg">
          <h4 className="text-base font-semibold mb-6 text-center text-neutral-700">
            Répartition par Catégorie
          </h4>
          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => 
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  outerRadius={120}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={5}
                >
                  {pieData.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]}
                      className="transition-opacity duration-200 hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-neutral-100 transition-all duration-300 hover:shadow-lg">
          <h4 className="text-base font-semibold mb-6 text-center text-neutral-700">
            Comparaison Mensuelle (N vs N-1)
          </h4>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={12}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                  tickFormatter={(value) => `${value}€`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="montant" 
                  radius={[8, 8, 0, 0]}
                  maxBarSize={100}
                >
                  {monthlyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`}
                      fill={entry.fill}
                      className="transition-opacity duration-200 hover:opacity-80"
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