import { TooltipProps } from 'recharts';

export const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
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