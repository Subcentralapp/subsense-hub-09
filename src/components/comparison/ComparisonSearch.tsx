import { Application } from "@/types/application";
import { SearchDropdown } from "../search/SearchDropdown";
import { Plus, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonSearchProps {
  searchTerms?: string[];
  searchTerm?: string;
  onSearchChange: (value: string, index?: number) => void;
  applications?: Application[];
  onSelectApp: (app: Application, index?: number) => void;
  selectedApps: Application[];
  isMobile?: boolean;
}

export const ComparisonSearch = ({
  searchTerms,
  searchTerm,
  onSearchChange,
  applications,
  onSelectApp,
  selectedApps,
  isMobile = false,
}: ComparisonSearchProps) => {
  if (isMobile) {
    return (
      <div className="w-full space-y-4">
        {[0, 1, 2].map((index) => (
          <div key={index} className="relative bg-white rounded-lg shadow-sm">
            <div className="p-3">
              {selectedApps[index] ? (
                <div className="flex items-center gap-3">
                  {selectedApps[index].logo_url ? (
                    <img 
                      src={selectedApps[index].logo_url}
                      alt={`Logo ${selectedApps[index].name}`}
                      className="w-10 h-10 rounded-lg object-contain bg-white shadow-sm border border-gray-100"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">
                        {selectedApps[index].name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedApps[index].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedApps[index].category || 'Non catégorisé'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-500">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <SearchDropdown
                      searchTerm={searchTerm || ''}
                      onSearchChange={(value) => onSearchChange(value)}
                      filteredApps={applications?.filter(app => {
                        const searchLower = (searchTerm || '').toLowerCase();
                        return (
                          app.name?.toLowerCase().includes(searchLower) ||
                          app.category?.toLowerCase().includes(searchLower) ||
                          app.description?.toLowerCase().includes(searchLower)
                        );
                      })}
                      onSelectApp={(app) => onSelectApp(app)}
                      placeholder="Rechercher une application"
                      className="w-full"
                    />
                  </div>
                </div>
              )}
            </div>
            {index < 2 && (
              <div className="flex justify-center py-2">
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {searchTerms && [0, 1, 2].map((index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className={`rounded-xl ${
            selectedApps[index] 
              ? 'bg-white shadow-lg border border-primary/20' 
              : 'bg-neutral-light border-2 border-dashed border-gray-200 hover:border-primary/30 transition-all'
          }`}>
            <div className="p-4">
              {selectedApps[index] ? (
                <div className="flex items-center gap-4 mb-4">
                  {selectedApps[index].logo_url ? (
                    <img 
                      src={selectedApps[index].logo_url}
                      alt={`Logo ${selectedApps[index].name}`}
                      className="w-12 h-12 rounded-lg object-contain bg-white shadow-sm border border-gray-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">
                        {selectedApps[index].name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedApps[index].name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedApps[index].category || 'Non catégorisé'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center mb-4">
                  <Plus className="h-8 w-8 text-primary/40 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-600">
                    Application {index + 1}
                  </h3>
                </div>
              )}
              <SearchDropdown
                searchTerm={searchTerms[index]}
                onSearchChange={(value) => onSearchChange(value, index)}
                filteredApps={applications?.filter(app => {
                  const searchLower = searchTerms[index].toLowerCase();
                  return (
                    app.name?.toLowerCase().includes(searchLower) ||
                    app.category?.toLowerCase().includes(searchLower) ||
                    app.description?.toLowerCase().includes(searchLower)
                  );
                })}
                onSelectApp={(app) => onSelectApp(app, index)}
                placeholder={selectedApps[index] ? "Changer d'application" : "Rechercher une application"}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};