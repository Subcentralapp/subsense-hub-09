import { Application } from "@/types/application";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  // Ferme la liste déroulante quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.search-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative search-container ${className}`}>
      <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
        <Search className="h-4 w-4 shrink-0 text-gray-500 mr-2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            console.log("SearchDropdown - Input change:", e.target.value);
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-gray-500"
          placeholder={placeholder}
        />
      </div>

      {isOpen && searchTerm && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg border shadow-lg">
          <div className="max-h-[300px] overflow-y-auto p-2">
            {filteredApps && filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <button
                  key={app.id}
                  onClick={() => {
                    console.log("SearchDropdown - App selected:", app);
                    onSelectApp(app);
                    setIsOpen(false);
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
                    <div className="font-medium">{app.name}</div>
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
        </div>
      )}
    </div>
  );
};