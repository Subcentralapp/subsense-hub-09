import { Card } from "@/components/ui/card";
import SubscriptionList from "@/components/SubscriptionList";

const Subscriptions = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Mes abonnements</h1>
      <Card className="p-6">
        <SubscriptionList />
      </Card>
    </div>
  );
};

export default Subscriptions;