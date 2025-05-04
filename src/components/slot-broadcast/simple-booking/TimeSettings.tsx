
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TIME_SLOTS, DURATION_OPTIONS } from "../utils/timeUtils";

interface TimeSettingsProps {
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  duration: string;
  setDuration: (duration: string) => void;
}

const TimeSettings = ({ 
  startTime, 
  setStartTime, 
  endTime, 
  setEndTime,
  duration,
  setDuration
}: TimeSettingsProps) => {
  // Filter end time options to only show times after the selected start time
  const getEndTimeOptions = () => {
    const startIndex = TIME_SLOTS.findIndex(slot => slot === startTime);
    if (startIndex === -1) return TIME_SLOTS;
    return TIME_SLOTS.slice(startIndex + 1);
  };

  return (
    <div className="space-y-4">
      {/* Start time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <Select value={startTime} onValueChange={(value) => {
          setStartTime(value);
          // Adjust end time if necessary
          const startIndex = TIME_SLOTS.findIndex(slot => slot === value);
          const endIndex = TIME_SLOTS.findIndex(slot => slot === endTime);
          if (startIndex >= endIndex) {
            setEndTime(TIME_SLOTS[Math.min(startIndex + 1, TIME_SLOTS.length - 1)]);
          }
        }}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Start time" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {TIME_SLOTS.map(time => (
              <SelectItem key={time} value={time}>{time}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* End time */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <Select value={endTime} onValueChange={setEndTime}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="End time" />
          </SelectTrigger>
          <SelectContent className="max-h-[300px] overflow-y-auto">
            {getEndTimeOptions().map(time => (
              <SelectItem key={time} value={time} disabled={time === startTime}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
        <Select value={duration} onValueChange={setDuration}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            {DURATION_OPTIONS.map(option => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeSettings;
