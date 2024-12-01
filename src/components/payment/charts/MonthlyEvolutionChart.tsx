import { format, subMonths } from "date-fns";
import { fr } from "date-fns/locale";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from "./CustomTooltip";
import { Card } from "@/components/ui/card";

interface MonthlyEvolutionChartProps {
  currentMonthTotal: number;
  previousMonthTotal: number;
  savings: number;
}

export const MonthlyEvolutionChart = ({ 
  currentMonthTotal, 
  previousMonthTotal,
  savings 
}: MonthlyEvolutionChartProps) => {
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

  return (
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
  );
};