import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvoiceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: any) => void;
}

const InvoiceFilters = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy
}: InvoiceFiltersProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Input
          type="text"
          placeholder="Rechercher une facture..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="name">Nom</SelectItem>
          <SelectItem value="price">Prix</SelectItem>
          <SelectItem value="status">Statut</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default InvoiceFilters;