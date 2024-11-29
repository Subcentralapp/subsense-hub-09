import { Card } from "@/components/ui/card";
import { Calendar, CreditCard } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

interface Payment {
  id: number;
  name: string;
  price: number;
  next_billing: string;
}

const UpcomingPayments = () => {
  const { data: upcomingPayments = [], isLoading } = useQuery({
    queryKey: ['upcoming-payments'],
    queryFn: async () => {
      console.log("Fetching upcoming payments...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.log("No user found, returning empty array");
        return [];
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('id, name, price, next_billing')
        .eq('user_id', user.id)
        .order('next_billing', { ascending: true });

      if (error) {
        console.error("Error fetching subscriptions:", error);
        throw error;
      }

      console.log("Fetched subscriptions:", data);
      return data as Payment[];
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-md border border-neutral-light shadow-lg">
        <div className="flex items-center justify-center h-40">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (!upcomingPayments.length) {
    return (
      <Card className="p-6 bg-white/80 backdrop-blur-md border border-neutral-light shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Échéancier des Prélèvements</h2>
          <CreditCard className="h-6 w-6 text-primary" />
        </div>
        <div className="text-center py-8 text-gray-500">
          Aucun prélèvement à venir
        </div>
      </Card>
    );
  }

  const today = new Date();
  const firstPaymentDate = new Date(upcomingPayments[0].next_billing);
  const lastPaymentDate = new Date(upcomingPayments[upcomingPayments.length - 1].next_billing);
  const totalDays = differenceInDays(lastPaymentDate, firstPaymentDate) || 1;
  const totalAmount = upcomingPayments.reduce((sum, payment) => sum + Number(payment.price), 0);

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
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-1 text-gray-800">Échéancier des Prélèvements</h2>
          <p className="text-sm text-gray-500">
            Total à venir : <span className="font-semibold">{totalAmount.toFixed(2)} €</span>
          </p>
        </div>
        <CreditCard className="h-6 w-6 text-primary" />
      </div>

      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-6">
          <div className="relative">
            <div className="absolute w-0.5 h-full bg-neutral-light/50 left-3 top-0" />
            {upcomingPayments.map((payment, index) => (
              <div
                key={payment.id}
                className="relative flex items-start mb-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute left-2 w-3 h-3 rounded-full bg-primary shadow-lg transform -translate-x-1/2 mt-2" />
                <div className="ml-8 bg-white p-3 rounded-lg shadow-sm border border-neutral-light w-full hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="font-medium text-gray-800">{payment.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {format(new Date(payment.next_billing), "d MMMM yyyy", { locale: fr })}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-gray-800">
                        {Number(payment.price).toFixed(2)} €
                      </span>
                      <div className="text-xs font-medium text-primary mt-1">
                        {getDaysUntil(payment.next_billing)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>{format(firstPaymentDate, "d MMM", { locale: fr })}</span>
              <span>{format(lastPaymentDate, "d MMM", { locale: fr })}</span>
            </div>
            <Progress value={100} className="h-1.5 bg-neutral-light" />
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
};

export default UpcomingPayments;