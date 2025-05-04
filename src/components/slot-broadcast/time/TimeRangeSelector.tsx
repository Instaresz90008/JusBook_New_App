
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TimeRangeSelectorProps {
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  timeSlots: string[];
  className?: string;
}

const TimeRangeSelector = ({
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  timeSlots,
  className = ""
}: TimeRangeSelectorProps) => {
  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    
    // Auto-adjust end time if needed
    const startIndex = timeSlots.indexOf(value);
    const endIndex = timeSlots.indexOf(endTime);
    
    // If end time is before start time or less than 15 minutes after
    if (endIndex <= startIndex) {
      const newEndIndex = Math.min(startIndex + 1, timeSlots.length - 1);
      setEndTime(timeSlots[newEndIndex]);
    }
  };

  return (
    <div className={`flex space-x-2 ${className}`}>
      <div className="flex-1">
        <Select value={startTime} onValueChange={handleStartTimeChange}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Start" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={`start-${time}`} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex-1">
        <Select value={endTime} onValueChange={setEndTime}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="End" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots
              .filter((_, index) => index > timeSlots.indexOf(startTime))
              .map((time) => (
                <SelectItem key={`end-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeRangeSelector;
