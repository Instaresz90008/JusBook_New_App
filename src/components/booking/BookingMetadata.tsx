
import { Clock, Video } from "lucide-react";

interface BookingMetadataProps {
  duration: string;
  additionalInfo: string;
}

const BookingMetadata = ({ duration, additionalInfo }: BookingMetadataProps) => {
  return (
    <div className="mt-6 text-sm space-y-4">
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Clock className="h-4 w-4 text-blue-200" />
        </div>
        <span>{duration}</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
          <Video className="h-4 w-4 text-blue-200" />
        </div>
        <span>{additionalInfo}</span>
      </div>
    </div>
  );
};

export default BookingMetadata;
