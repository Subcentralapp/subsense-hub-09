import { Application } from "@/types/application";
import { Command } from "cmdk";
import { Search } from "lucide-react";

interface SearchDropdownProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredApps?: Application[];
  onSelectApp: (app: Application) => void;
  placeholder?: string;
}

export const SearchDropdown = ({
  searchTerm,
  onSearchChange,
  filteredApps,
  onSelectApp,
  placeholder = "Rechercher..."
}: SearchDropdownProps) => {
  return (
    <Command className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center border-b px-3">
        <Search className="h-4 w-4 shrink-0 text-gray-400" />
        <input
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="flex h-10 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
        />
      </div>
      {searchTerm && (
        <div className="max-h-[300px] overflow-y-auto p-1">
          {filteredApps?.map((app) => (
            <button
              key={app.name}
              onClick={() => onSelectApp(app)}
              className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-left hover:bg-primary/5 cursor-pointer"
            >
              {app.logo_url ? (
                <img 
                  src={app.logo_url}
                  alt={`Logo ${app.name}`}
                  className="w-8 h-8 rounded object-contain bg-white"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`;
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <div className="font-medium">{app.name}</div>
                <div className="text-xs text-gray-500">{app.category || 'Non catégorisé'}</div>
              </div>
            </button>
          ))}
          {(!filteredApps || filteredApps.length === 0) && (
            <div className="py-6 text-center text-sm text-gray-500">
              Aucune application trouvée
            </div>
          )}
        </div>
      )}
    </Command>
  );
};