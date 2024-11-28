import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Application } from "@/types/application";

interface ApplicationSearchProps {
  applications: Application[] | undefined;
}

const ApplicationSearch = ({ applications }: ApplicationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [...new Set(applications?.map(app => app.category))];

  return (
    <div className="flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une application..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      <select
        value={selectedCategory || ""}
        onChange={(e) => setSelectedCategory(e.target.value || null)}
        className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <option value="">Toutes les catégories</option>
        {categories.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>
    </div>
  );
};

export default ApplicationSearch;