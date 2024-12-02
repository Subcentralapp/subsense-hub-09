import { Card } from "@/components/ui/card";
import { PaymentsContent } from "@/components/dashboard/PaymentsContent";

const Budget = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Budget</h1>
      <Card className="p-6">
        <PaymentsContent />
      </Card>
    </div>
  );
};

export default Budget;