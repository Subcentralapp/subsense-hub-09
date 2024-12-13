import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";
import { Card } from "@/components/ui/card";

export const AppsContent = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <TechnicalStackSuggestion />
      </Card>
    </div>
  );
};