import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Application } from "@/types/application";

interface ApplicationSearchProps {
  applications: Application[] | undefined;
  onSearch: (searchTerm: string, category: string | null) => void;
}

const ApplicationSearch = ({ applications, onSearch }: ApplicationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm, null);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une application..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-9"
        />
      </div>
    </div>
  );
};

export default ApplicationSearch;