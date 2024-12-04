import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { SelectedSubscriptions } from "./SelectedSubscriptions";
import { CommonSubscriptions } from "./components/CommonSubscriptions";
import { useSubscriptionSearch } from "./hooks/useSubscriptionSearch";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const FavoriteSubscriptionsSection = ({ value, onChange }: Props) => {
  const {
    otherSubscription,
    setOtherSubscription,
    searchResults,
    setSearchResults,
    isSearching
  } = useSubscriptionSearch();

  const handleSubscriptionToggle = (subscription: string) => {
    if (value.length >= 5 && !value.includes(subscription)) {
      return;
    }
    onChange(
      value.includes(subscription)
        ? value.filter(s => s !== subscription)
        : [...value, subscription]
    );
  };

  return (
    <div className="space-y-4 bg-white rounded-xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Vos abonnements préférés
        </h3>
        <p className="text-sm text-gray-500">
          Choisissez jusqu'à 5 applications ou services
        </p>
      </div>
      
      <CommonSubscriptions 
        value={value}
        onToggle={handleSubscriptionToggle}
      />

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher d'autres abonnements..."
          value={otherSubscription}
          onChange={(e) => setOtherSubscription(e.target.value)}
          disabled={value.length >= 5}
          className="pl-9"
        />
      </div>

      <SearchResults 
        searchResults={searchResults}
        otherSubscription={otherSubscription}
        handleSubscriptionToggle={handleSubscriptionToggle}
        setOtherSubscription={setOtherSubscription}
        setSearchResults={setSearchResults}
        value={value}
      />

      <SelectedSubscriptions value={value} />
    </div>
  );
};