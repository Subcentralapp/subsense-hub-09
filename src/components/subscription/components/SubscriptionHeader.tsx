interface SubscriptionHeaderProps {
  name: string;
  category: string;
  isTrial: boolean;
  trialEndDate?: string | null;
}

export const SubscriptionHeader = ({ name, category }: SubscriptionHeaderProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500">{category}</p>
    </div>
  );
};