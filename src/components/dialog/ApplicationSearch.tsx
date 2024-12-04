import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Application } from "@/types/application";

interface ApplicationSearchProps {
  applications: Application[] | undefined;
  onSearch: (searchTerm: string) => void;
}

const ApplicationSearch = ({ onSearch }: ApplicationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une application..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9 [text-size-adjust:none]"
        />
      </div>
    </div>
  );
};

export default ApplicationSearch;