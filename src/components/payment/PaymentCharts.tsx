import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { format, subMonths } from "date-fns";
import { fr } from "date-fns/locale";

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

  const currentMonthTotal = subscriptions?.reduce((total, sub) => total + Number(sub.price), 0) || 0;
  const previousMonthTotal = currentMonthTotal * 1.2;
  const savings = previousMonthTotal - currentMonthTotal;

  // Grouper les dépenses par catégorie
  const categoryData = subscriptions?.reduce((acc: any, sub) => {
    const category = sub.category || 'Autre';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(sub.price);
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData || {}).map(([name, amount]) => ({
    name,
    montant: amount,
  }));

  const monthlyData = [
    {
      name: format(subMonths(new Date(), 1), 'MMM', { locale: fr }),
      montant: previousMonthTotal,
      fill: '#1a237e'
    },
    {
      name: format(new Date(), 'MMM', { locale: fr }),
      montant: currentMonthTotal,
      fill: '#1a237e'
    }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-neutral-100">
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
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium text-neutral-800">
              Évolution Mensuelle
            </h3>
            {savings > 0 && (
              <span className="text-sm text-green-600 font-medium bg-green-50 px-3 py-1 rounded-full">
                -{savings.toFixed(0)}€
              </span>
            )}
          </div>

          <div className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorMontant" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1a237e" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1a237e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area 
                  type="monotone"
                  dataKey="montant"
                  stroke="#1a237e"
                  fillOpacity={1}
                  fill="url(#colorMontant)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-medium text-neutral-800">
            Dépenses par Catégorie
          </h3>

          <div className="h-[250px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData} layout="vertical">
                <XAxis 
                  type="number"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                  tickFormatter={(value) => `${value}€`}
                />
                <YAxis 
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="montant" 
                  fill="#1a237e"
                  radius={[0, 4, 4, 0]}
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentCharts;