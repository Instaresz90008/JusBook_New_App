
import { format } from "date-fns";
import { CalendarDays, Clock, User, Mail } from "lucide-react";

interface BookingSummaryProps {
  date: Date | undefined;
  time: string | null;
  providerName: string;
  duration: string;
  name?: string;
  email?: string;
  compact?: boolean;
  variant?: 'default' | 'card';
}

const BookingSummary = ({ 
  date, 
  time, 
  providerName, 
  duration, 
  name, 
  email, 
  compact = false,
  variant = 'default'
}: BookingSummaryProps) => {
  if (variant === 'card') {
    return (
      <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mb-6">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Booking Summary</h4>
        {compact ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center text-sm">
              <CalendarDays className="h-4 w-4 text-blue-600 mr-2" />
              <span>{date && format(date, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-blue-600 mr-2" />
              <span>{time}</span>
            </div>
            {name && (
              <div className="flex items-center text-sm">
                <User className="h-4 w-4 text-blue-600 mr-2" />
                <span>{name || "Guest"}</span>
              </div>
            )}
            {email && (
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-blue-600 mr-2" />
                <span>{email || "No email provided"}</span>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex items-center text-sm mb-1">
              <CalendarDays className="h-4 w-4 text-blue-600 mr-2" />
              <span>{date && format(date, 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center text-sm mb-1">
              <Clock className="h-4 w-4 text-blue-600 mr-2" />
              <span>{time}</span>
            </div>
            <div className="flex items-center text-sm">
              <User className="h-4 w-4 text-blue-600 mr-2" />
              <span>{providerName} • {duration}</span>
            </div>
          </>
        )}
      </div>
    );
  }

  // Default variant - simple inline summary
  return (
    <div className="mt-6 bg-blue-50/50 border border-blue-100 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-800 mb-2">Booking Summary</h4>
      <div className="flex items-center text-sm mb-1">
        <CalendarDays className="h-4 w-4 text-blue-600 mr-2" />
        <span>{date && format(date, 'MMMM d, yyyy')}</span>
      </div>
      <div className="flex items-center text-sm mb-1">
        <Clock className="h-4 w-4 text-blue-600 mr-2" />
        <span>{time}</span>
      </div>
      <div className="flex items-center text-sm">
        <User className="h-4 w-4 text-blue-600 mr-2" />
        <span>{providerName} • {duration}</span>
      </div>
    </div>
  );
};

export default BookingSummary;
