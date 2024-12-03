import { Card } from "@/components/ui/card";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";

const Applications = () => {
  console.log("Applications page rendering");
  
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Applications</h1>
      <Card className="p-6">
        <TechnicalStackSuggestion />
      </Card>
    </div>
  );
};

export default Applications;