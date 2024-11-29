import { Card } from "@/components/ui/card";
import { Calendar, CreditCard } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";

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

  const totalAmount = upcomingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const today = new Date();
  const firstPaymentDate = new Date(upcomingPayments[0].date);
  const lastPaymentDate = new Date(upcomingPayments[upcomingPayments.length - 1].date);
  const totalDays = differenceInDays(lastPaymentDate, firstPaymentDate) || 1;

  const getPositionInTimeline = (date: string) => {
    const paymentDate = new Date(date);
    const daysFromFirst = differenceInDays(paymentDate, firstPaymentDate);
    return (daysFromFirst / totalDays) * 100;
  };

  const getDaysUntil = (date: string) => {
    const days = differenceInDays(new Date(date), today);
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Demain";
    return `Dans ${days} jours`;
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border border-neutral-light shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold mb-1 text-gray-800">Échéancier des Prélèvements</h2>
          <p className="text-sm text-gray-500">
            Total à venir : <span className="font-semibold">{totalAmount.toFixed(2)} €</span>
          </p>
        </div>
        <CreditCard className="h-6 w-6 text-primary" />
      </div>

      <div className="space-y-8">
        <div className="relative pt-8 pb-4">
          <div className="absolute w-full h-1 bg-neutral-light rounded-full" />
          {upcomingPayments.map((payment) => {
            const position = getPositionInTimeline(payment.date);
            return (
              <div
                key={payment.id}
                className="absolute transform -translate-x-1/2"
                style={{ left: `${position}%`, top: '0' }}
              >
                <div className="flex flex-col items-center animate-fade-in">
                  <div className="w-4 h-4 rounded-full bg-primary mb-2 shadow-lg" />
                  <div className="bg-white p-3 rounded-lg shadow-md border border-neutral-light min-w-[200px]">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium text-gray-800">{payment.service}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(payment.date), "d MMMM yyyy", { locale: fr })}
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                      <span className="text-xs font-medium text-primary">
                        {getDaysUntil(payment.date)}
                      </span>
                      <span className="font-semibold text-gray-800">
                        {payment.amount.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>{format(firstPaymentDate, "d MMM", { locale: fr })}</span>
            <span>{format(lastPaymentDate, "d MMM", { locale: fr })}</span>
          </div>
          <Progress 
            value={100} 
            className="h-2 bg-neutral-light"
          />
        </div>
      </div>
    </Card>
  );
};

export default UpcomingPayments;