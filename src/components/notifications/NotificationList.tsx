import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/useNotifications";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Bell, Calendar, CreditCard, XCircle } from "lucide-react";
import { Button } from "../ui/button";

export const NotificationList = () => {
  const { notifications, markAsRead, isLoading } = useNotifications();

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        <Bell className="h-12 w-12 mx-auto mb-3 text-muted-foreground/50" />
        <p>Aucune notification</p>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'upcoming_payment':
        return <CreditCard className="h-5 w-5" />;
      case 'trial_ending':
        return <Calendar className="h-5 w-5" />;
      case 'cancellation_reminder':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <ScrollArea className="h-[450px]">
      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-3 p-3 rounded-lg transition-colors ${
              notification.read ? 'bg-background' : 'bg-primary/5'
            }`}
            onClick={() => !notification.read && markAsRead(notification.id)}
          >
            <div className="flex-shrink-0 text-primary">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.message}</p>
              {notification.due_date && (
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(notification.due_date), "d MMMM yyyy", { locale: fr })}
                </p>
              )}
            </div>
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  markAsRead(notification.id);
                }}
              >
                Marquer comme lu
              </Button>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};