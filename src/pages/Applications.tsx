import { Card } from "@/components/ui/card";
import { TechnicalStackSuggestion } from "@/components/TechnicalStackSuggestion";

const Applications = () => {
  console.log("Applications page rendering");
  
  return (
    <div className="container mx-auto p-6">
      <TechnicalStackSuggestion />
    </div>
  );
};

export default Applications;