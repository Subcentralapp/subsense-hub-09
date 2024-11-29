import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
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
        <div className="bg-white p-3 rounded-lg shadow-lg border border-neutral-100">
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
    <Card className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h3 className="text-xl font-semibold text-neutral-800">
            Évolution des Dépenses
          </h3>
          {savings > 0 && (
            <div className="bg-green-50 px-4 py-2 rounded-full border border-green-100">
              <span className="text-green-700 text-sm font-medium">
                Économies: {savings.toFixed(2)}€ ({savingsPercentage}%)
              </span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-100">
          <h4 className="text-sm font-medium text-neutral-600 mb-4">
            Comparaison Mensuelle
          </h4>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barGap={8}>
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
                  radius={[4, 4, 0, 0]}
                  maxBarSize={80}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PaymentCharts;