import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { CustomTooltip } from "./CustomTooltip";
import { Card } from "@/components/ui/card";

interface CategoryChartProps {
  categoryData: { name: string; montant: number; }[];
}

export const CategoryChart = ({ categoryData }: CategoryChartProps) => {
  return (
    <Card className="bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-white/20">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-medium text-neutral-800">
          Dépenses par Catégorie
        </h3>

        <div className="h-[250px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} layout="vertical">
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
  );
};