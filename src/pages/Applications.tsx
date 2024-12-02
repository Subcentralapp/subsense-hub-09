import { Card } from "@/components/ui/card";
import ApplicationList from "@/components/ApplicationList";

const Applications = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <Card className="p-6">
        <ApplicationList />
      </Card>
    </div>
  );
};

export default Applications;