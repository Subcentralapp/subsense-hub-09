interface StatsCardProps {
  title: string;
  children: React.ReactNode;
}

export const StatsCard = ({ title, children }: StatsCardProps) => {
  return (
    <div className="p-4 rounded-lg bg-white/50 border border-neutral-light">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
};