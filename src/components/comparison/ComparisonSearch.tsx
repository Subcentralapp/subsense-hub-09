import { Application } from "@/types/application";
import { SearchDropdown } from "../search/SearchDropdown";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ComparisonSearchProps {
  searchTerms: string[];
  onSearchChange: (value: string, index: number) => void;
  applications?: Application[];
  onSelectApp: (app: Application, index: number) => void;
  selectedApps: Application[];
}

export const ComparisonSearch = ({
  searchTerms,
  onSearchChange,
  applications,
  onSelectApp,
  selectedApps,
}: ComparisonSearchProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[0, 1, 2].map((index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <div className={`rounded-xl p-4 ${
            selectedApps[index] 
              ? 'bg-white shadow-lg' 
              : 'bg-neutral-light border-2 border-dashed border-gray-200'
          }`}>
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
              placeholder={`Application ${index + 1}`}
            />
            {!selectedApps[index] && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Plus className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};