
import { useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeSlotGridProps {
  timeSlots: string[];
  selectedTime: string | null;
  onTimeSelect: (time: string) => void;
  isLoading?: boolean;
}

const TimeSlotGrid = ({ 
  timeSlots, 
  selectedTime, 
  onTimeSelect,
  isLoading = false 
}: TimeSlotGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {Array(6).fill(0).map((_, index) => (
          <Skeleton key={index} className="h-14 w-full" />
        ))}
      </div>
    );
  }

  if (timeSlots.length === 0) {
    return (
      <div className="py-8 text-center">
        <Clock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500">No available time slots for this date</p>
        <p className="text-sm text-gray-400 mt-1">Please select another date</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {timeSlots.map((time) => (
        <button
          key={time}
          className={cn(
            "relative group rounded-lg border p-3 text-center transition-all duration-300",
            "hover:shadow-md hover:border-primary/50 hover:scale-[1.02]",
            "flex items-center justify-center h-14",
            selectedTime === time 
              ? "bg-primary text-primary-foreground border-primary shadow-sm" 
              : "bg-background hover:border-primary/50 hover:bg-primary/5"
          )}
          onClick={() => onTimeSelect(time)}
        >
          <Clock className={cn(
            "h-4 w-4 mr-2 transition-opacity",
            selectedTime === time ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )} />
          <span className="font-medium">{time}</span>
        </button>
      ))}
    </div>
  );
};

export default TimeSlotGrid;
