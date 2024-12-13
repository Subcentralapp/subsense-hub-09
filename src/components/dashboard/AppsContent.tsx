import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";
import { TrendingTools2025 } from "@/components/TrendingTools2025";
import { Card } from "@/components/ui/card";

export const AppsContent = () => {
  return (
    <div className="space-y-8">
      <Card className="p-6">
        <TechnicalStackSuggestion />
      </Card>
      <Card className="p-6">
        <TrendingTools2025 />
      </Card>
    </div>
  );
};