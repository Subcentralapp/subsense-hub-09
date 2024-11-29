import { Card } from "@/components/ui/card";
import { Calendar, AlertCircle, CreditCard } from "lucide-react";
import { format, isBefore, addDays } from "date-fns";
import { fr } from "date-fns/locale";

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
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getPaymentStatus = (date: string) => {
    const paymentDate = new Date(date);
    const today = new Date();
    const isUrgent = isBefore(paymentDate, addDays(today, 3));
    
    return {
      urgent: isUrgent,
      statusColor: isUrgent ? "text-red-500" : "text-green-500",
      bgColor: isUrgent ? "bg-red-50" : "bg-green-50",
      borderColor: isUrgent ? "border-red-100" : "border-green-100"
    };
  };

  const totalAmount = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Card className="p-6 glass-card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1">Prochains Prélèvements</h2>
          <p className="text-sm text-gray-500">
            Total à venir : <span className="font-semibold">{totalAmount.toFixed(2)} €</span>
          </p>
        </div>
        <CreditCard className="h-6 w-6 text-primary" />
      </div>

      <div className="space-y-4">
        {upcomingPayments.map((payment) => {
          const status = getPaymentStatus(payment.date);
          
          return (
            <div
              key={payment.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:translate-x-1 ${status.bgColor} ${status.borderColor}`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${status.bgColor}`}>
                  <Calendar className={`h-5 w-5 ${status.statusColor}`} />
                </div>
                <div>
                  <p className="font-medium flex items-center gap-2">
                    {payment.service}
                    {status.urgent && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </p>
                  <p className="text-sm text-gray-500">
                    Prélèvement prévu le{" "}
                    {format(new Date(payment.date), "d MMMM yyyy", { locale: fr })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{payment.amount.toFixed(2)} €</p>
                <p className={`text-xs ${status.statusColor} font-medium`}>
                  {status.urgent ? "Prélèvement imminent" : "Planifié"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default UpcomingPayments;