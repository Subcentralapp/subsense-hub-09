import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const subscriptions = [
  { id: 1, name: "Netflix", price: 17.99, category: "Streaming", nextBilling: "2024-05-01" },
  { id: 2, name: "Spotify", price: 9.99, category: "Musique", nextBilling: "2024-05-15" },
  { id: 3, name: "Amazon Prime", price: 6.99, category: "Shopping", nextBilling: "2024-05-10" },
  { id: 4, name: "Disney+", price: 8.99, category: "Streaming", nextBilling: "2024-05-05" },
];

const SubscriptionList = () => {
  return (
    <Card className="p-6 glass-card">
      <h2 className="text-xl font-semibold mb-4">Mes Abonnements Actifs</h2>
      <div className="space-y-4">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover-scale"
          >
            <div>
              <h3 className="font-medium">{sub.name}</h3>
              <p className="text-sm text-gray-500">{sub.category}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium">{sub.price} €/mois</p>
                <p className="text-sm text-gray-500">
                  Prochain paiement: {new Date(sub.nextBilling).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SubscriptionList;