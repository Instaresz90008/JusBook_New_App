
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, MonitorSmartphone, CheckCircle2 } from "lucide-react";

interface BookingConfirmationCardProps {
  date: Date | undefined;
  time: string | null;
  duration: string;
  additionalInfo: string;
}

const BookingConfirmationCard = ({
  date,
  time,
  duration,
  additionalInfo
}: BookingConfirmationCardProps) => {
  return (
    <Card className="p-6 mb-8 shadow-md border-primary/10 bg-gradient-to-br from-white to-blue-50/60">
      <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-24 h-24 bg-green-100 opacity-70 blur-2xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 w-32 h-32 bg-blue-100 opacity-50 blur-2xl rounded-full"></div>
      
      <div className="relative text-left space-y-6">
        <div className="flex items-center mb-4">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Booking Confirmed</h3>
            <p className="text-sm text-gray-500">A confirmation email has been sent to you</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">Date & Time</span>
            <span className="block font-medium text-lg">
              {date && format(date, 'EEEE, MMMM d, yyyy')} at {time}
            </span>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">Duration</span>
            <span className="block font-medium text-lg">{duration}</span>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
            <MonitorSmartphone className="h-5 w-5" />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-500">How to join</span>
            <span className="block font-medium text-lg">{additionalInfo}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 mt-6 text-sm text-gray-500">
          <p>Need to make changes to this booking?</p>
          <p className="mt-1">You can reschedule or cancel this meeting from your confirmation email.</p>
        </div>
      </div>
    </Card>
  );
};

export default BookingConfirmationCard;
