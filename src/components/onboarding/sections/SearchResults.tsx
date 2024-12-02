import { motion, AnimatePresence } from "framer-motion";
import { Command } from "cmdk";
import { Application } from "@/types/application";

interface SearchResultsProps {
  searchResults: Partial<Application>[];
  otherSubscription: string;
  handleSubscriptionToggle: (subscription: string) => void;
  setOtherSubscription: (value: string) => void;
  setSearchResults: (results: Partial<Application>[]) => void;
  value: string[];
}

export const SearchResults = ({
  searchResults,
  otherSubscription,
  handleSubscriptionToggle,
  setOtherSubscription,
  setSearchResults,
  value,
}: SearchResultsProps) => {
  if (!otherSubscription || searchResults.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-10 w-full bg-white rounded-lg shadow-lg border border-gray-200 mt-1"
      >
        <Command className="rounded-lg overflow-hidden">
          <div className="max-h-[200px] overflow-y-auto p-2">
            {searchResults.map((app) => (
              <motion.button
                key={app.id}
                onClick={() => {
                  if (app.name) {
                    handleSubscriptionToggle(app.name);
                    setOtherSubscription("");
                    setSearchResults([]);
                  }
                }}
                className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-left hover:bg-primary/5 cursor-pointer"
                whileHover={{ scale: 1.01 }}
                disabled={value.length >= 5 && !value.includes(app.name || '')}
              >
                {app.logo_url ? (
                  <img 
                    src={app.logo_url}
                    alt={`Logo ${app.name}`}
                    className="w-6 h-6 rounded object-contain bg-white"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name || '')}&background=random`;
                    }}
                  />
                ) : (
                  <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">
                      {app.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-900">{app.name}</div>
                  <div className="text-xs text-gray-500">{app.category || 'Non catégorisé'}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </Command>
      </motion.div>
    </AnimatePresence>
  );
};