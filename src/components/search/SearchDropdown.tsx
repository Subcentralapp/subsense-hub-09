import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Application } from "@/types/application";

interface SearchDropdownProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredApps: Application[] | undefined;
  onSelectApp: (appName: string) => void;
  placeholder: string;
}

export const SearchDropdown = ({
  searchTerm,
  onSearchChange,
  filteredApps,
  onSelectApp,
  placeholder,
}: SearchDropdownProps) => {
  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9"
        />
      </div>
      {searchTerm && (
        <div className="absolute mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-10">
          {filteredApps?.map((app) => (
            <div
              key={app.name}
              className="px-4 py-2 hover:bg-neutral-light cursor-pointer transition-colors"
              onClick={() => {
                onSelectApp(app.name);
                onSearchChange("");
              }}
            >
              {app.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};