import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Payment {
  id: number;
  service: string;
  amount: number;
  date: string;
}

const UpcomingPayments = () => {
  const upcomingPayments = [
    { id: 1, service: "Netflix", amount: 17.99, date: "2024-02-15" },
    { id: 2, service: "Spotify", amount: 9.99, date: "2024-02-20" },
    { id: 3, service: "Amazon Prime", amount: 6.99, date: "2024-02-25" },
  ];

  return (
    <Card className="p-6 glass-card">
      <h2 className="text-xl font-semibold mb-4">Paiements à venir</h2>
      <div className="space-y-4">
        {upcomingPayments.map((payment) => (
          <div
            key={payment.id}
            className="flex items-center justify-between p-4 bg-white/50 rounded-lg hover-scale"
          >
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{payment.service}</p>
                <p className="text-sm text-gray-500">
                  {new Date(payment.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="font-semibold">{payment.amount} €</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingPayments;