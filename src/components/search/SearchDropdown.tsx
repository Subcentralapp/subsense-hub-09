import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Application } from "@/types/application";

interface SearchDropdownProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredApps: Application[] | undefined;
  onSelectApp: (app: Application) => void;
  placeholder: string;
  selectedApp?: Application | null;
}

export const SearchDropdown = ({
  searchTerm,
  onSearchChange,
  filteredApps,
  onSelectApp,
  placeholder,
  selectedApp,
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
      
      {selectedApp && (
        <div className="mt-2 p-2 bg-neutral-light rounded-md">
          Application sélectionnée: <span className="font-semibold">{selectedApp.name}</span>
        </div>
      )}
      
      {searchTerm && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 max-h-48 overflow-y-auto">
          {filteredApps && filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <div
                key={`${app.name}-${app.category}`}
                className="px-4 py-2 hover:bg-neutral-light cursor-pointer transition-colors"
                onClick={() => {
                  onSelectApp(app);
                  onSearchChange("");
                }}
              >
                <div className="font-medium">{app.name}</div>
                <div className="text-sm text-gray-500">{app.category}</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">
              Aucune application trouvée
            </div>
          )}
        </div>
      )}
    </div>
  );
};