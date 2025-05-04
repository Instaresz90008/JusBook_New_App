
import { useState } from "react";
import { format } from "date-fns";
import { Calendar, Clock } from "lucide-react";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TIME_SLOTS } from "./utils/timeUtils";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  buffer: number;
  setBuffer: (buffer: number) => void;
}

const DateTimeSelector = ({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  buffer,
  setBuffer
}: DateTimeSelectorProps) => {
  // Filter end time options to only show times after the selected start time
  const getEndTimeOptions = () => {
    const startIndex = TIME_SLOTS.findIndex(slot => slot === startTime);
    if (startIndex === -1) return TIME_SLOTS;
    return TIME_SLOTS.slice(startIndex + 1);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full flex justify-between items-center"
            >
              {date ? format(date, "MM/dd/yyyy") : "Select date"}
              <Calendar className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <div className="relative">
          <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Select value={startTime} onValueChange={(value) => {
            setStartTime(value);
            // Adjust end time if necessary
            const startIndex = TIME_SLOTS.findIndex(slot => slot === value);
            const endIndex = TIME_SLOTS.findIndex(slot => slot === endTime);
            if (startIndex >= endIndex) {
              setEndTime(TIME_SLOTS[Math.min(startIndex + 1, TIME_SLOTS.length - 1)]);
            }
          }}>
            <SelectTrigger className="w-full pl-10">
              <SelectValue placeholder="Select start time" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {TIME_SLOTS.map((time) => (
                <SelectItem key={time} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <div className="relative">
          <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Select value={endTime} onValueChange={setEndTime}>
            <SelectTrigger className="w-full pl-10">
              <SelectValue placeholder="Select end time" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {getEndTimeOptions().map((time) => (
                <SelectItem key={time} value={time} disabled={time === startTime}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Buffer Time (minutes)</label>
        <Select value={buffer.toString()} onValueChange={value => setBuffer(parseInt(value))}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select buffer time" />
          </SelectTrigger>
          <SelectContent>
            {[0, 5, 10, 15, 20, 30].map((time) => (
              <SelectItem key={time} value={time.toString()}>
                {time} minutes
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-xs text-gray-500 mt-1">Time between consecutive bookings</p>
      </div>
    </div>
  );
};

export default DateTimeSelector;
