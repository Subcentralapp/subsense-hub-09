import { Application } from "@/types/application";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchDropdownProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filteredApps?: Application[];
  onSelectApp: (app: Application) => void;
  placeholder?: string;
  className?: string;
}

export const SearchDropdown = ({
  searchTerm,
  onSearchChange,
  filteredApps,
  onSelectApp,
  placeholder = "Rechercher...",
  className = ""
}: SearchDropdownProps) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [isLoading, setIsLoading] = useState(false);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() ? 
        <span key={i} className="bg-primary/20 text-primary">{part}</span> : 
        part
    );
  };

  return (
    <Command className={`rounded-lg border shadow-sm ${className}`}>
      <div className="flex items-center border-b px-3">
        <Search className="h-4 w-4 shrink-0 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            console.log("SearchDropdown - Input change:", e.target.value);
            onSearchChange(e.target.value);
            setIsLoading(true);
          }}
          className="flex h-12 w-full rounded-md bg-transparent py-3 px-2 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
          placeholder={placeholder}
        />
      </div>
      {searchTerm && (
        <div className="max-h-[300px] overflow-y-auto p-2">
          {isLoading ? (
            <div className="py-6 text-center text-sm text-gray-500">
              Recherche en cours...
            </div>
          ) : filteredApps && filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  console.log("SearchDropdown - App selected:", app);
                  onSelectApp(app);
                }}
                className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-left hover:bg-primary/5 cursor-pointer transition-colors"
              >
                {app.logo_url ? (
                  <img 
                    src={app.logo_url}
                    alt={`Logo ${app.name}`}
                    className="w-8 h-8 rounded object-contain bg-white border border-gray-100"
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
                <div className="flex-1 min-w-0">
                  <div className="font-medium">
                    {getHighlightedText(app.name, searchTerm)}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    {app.category || 'Non catégorisé'}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="py-6 text-center text-sm text-gray-500">
              Aucune application trouvée
            </div>
          )}
        </div>
      )}
    </Command>
  );
};