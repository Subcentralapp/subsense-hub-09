import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InvoiceFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: "date" | "name" | "price";
  setSortBy: (sort: "date" | "name" | "price") => void;
}

const InvoiceFilters = ({ searchTerm, setSearchTerm, sortBy, setSortBy }: InvoiceFiltersProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Rechercher une facture..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as "date" | "name" | "price")}
        className="border rounded-md p-2"
      >
        <option value="date">Trier par date</option>
        <option value="name">Trier par nom</option>
        <option value="price">Trier par prix</option>
      </select>
    </div>
  );
};

export default InvoiceFilters;