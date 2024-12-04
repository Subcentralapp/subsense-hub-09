import { Card } from "@/components/ui/card";
import SubscriptionList from "@/components/SubscriptionList";

const Subscriptions = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
      <h1 className="text-2xl font-bold mb-6">Mes abonnements</h1>
      <Card className="p-4 sm:p-6">
        <SubscriptionList />
      </Card>
    </div>
  );
};

export default Subscriptions;