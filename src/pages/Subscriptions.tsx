import { Card } from "@/components/ui/card";
import { CompareContent } from "@/components/dashboard/CompareContent";

const Subscriptions = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Comparer</h1>
      <Card className="p-6">
        <CompareContent />
      </Card>
    </div>
  );
};

export default Subscriptions;