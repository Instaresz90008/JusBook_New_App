
import { CalendarDays, Clock, Mail, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BookingHeaderProps {
  serviceProviderName: string;
  serviceName: string;
  serviceSubtitle: string;
  providerAvatar?: string;
}

const BookingHeader = ({
  serviceProviderName,
  serviceName,
  serviceSubtitle,
  providerAvatar,
}: BookingHeaderProps) => {
  const initials = serviceProviderName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      <div className="h-16 w-16 bg-white/90 backdrop-blur rounded-xl shadow-lg flex items-center justify-center text-blue-600 mb-2">
        <span className="text-2xl font-bold">EH</span>
      </div>

      <div className="space-y-1.5 mb-8">
        <p className="text-sm opacity-80 font-medium">Book with {serviceProviderName}</p>
        <h1 className="text-3xl font-bold">{serviceName}</h1>
        <p className="text-blue-100/90">{serviceSubtitle}</p>
      </div>

      <div className="relative mb-2">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-600/30 rounded-full"></div>
        <Avatar className="h-28 w-28 border-4 border-white/20">
          {providerAvatar ? (
            <AvatarImage src={providerAvatar} alt={serviceProviderName} />
          ) : (
            <AvatarFallback className="text-5xl font-medium bg-blue-400 text-blue-800">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
      </div>

      <h2 className="text-xl font-semibold">{serviceProviderName}</h2>

      <div className="w-full max-w-xs mt-4">
        <div className="relative h-1.5 w-full bg-blue-800/30 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-200 to-white w-2/3 rounded-full"></div>
        </div>
        <div className="flex justify-between text-xs mt-1.5 px-1 text-blue-200/80">
          <span>Details</span>
          <span>Information</span>
          <span>Questions</span>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;
