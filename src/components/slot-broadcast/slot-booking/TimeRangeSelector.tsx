
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock } from "lucide-react";

interface TimeRangeSelectorProps {
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  timeSlots: string[];
}

const TimeRangeSelector = ({ 
  startTime, 
  setStartTime, 
  endTime, 
  setEndTime,
  timeSlots 
}: TimeRangeSelectorProps) => {
  // Filter end time options to only show times after the selected start time
  const getEndTimeOptions = () => {
    const startIndex = timeSlots.findIndex(slot => slot === startTime);
    if (startIndex === -1) return timeSlots;
    return timeSlots.slice(startIndex + 1);
  };

  return (
    <>
      {/* Start time */}
      <Select value={startTime} onValueChange={(value) => {
        setStartTime(value);
        // Adjust end time if necessary
        const startIndex = timeSlots.findIndex(slot => slot === value);
        const endIndex = timeSlots.findIndex(slot => slot === endTime);
        if (startIndex >= endIndex) {
          setEndTime(timeSlots[Math.min(startIndex + 1, timeSlots.length - 1)]);
        }
      }}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Start time" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {timeSlots.map(time => (
            <SelectItem key={time} value={time}>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {time}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* End time */}
      <Select value={endTime} onValueChange={setEndTime}>
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="End time" />
        </SelectTrigger>
        <SelectContent className="max-h-[300px] overflow-y-auto">
          {getEndTimeOptions().map(time => (
            <SelectItem key={time} value={time} disabled={time === startTime}>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                {time}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default TimeRangeSelector;
