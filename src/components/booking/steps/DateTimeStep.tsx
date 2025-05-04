
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import TimeSlotGrid from "@/components/booking/TimeSlotGrid";
import BookingSummary from "@/components/booking/BookingSummary";
import StepIndicator from "@/components/booking/StepIndicator";
import NavigationFooter from "@/components/booking/NavigationFooter";
import { TIME_SLOTS } from "@/components/slot-broadcast/utils/timeUtils";
import { Badge } from "@/components/ui/badge";

interface DateTimeStepProps {
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string) => void;
  serviceData: {
    name: string;
    providerName: string;
    duration: string;
  };
  onNext: () => void;
}

const DateTimeStep = ({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  serviceData,
  onNext
}: DateTimeStepProps) => {
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  
  // Handle date change with loading state
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(null);
    
    if (date) {
      setIsLoadingSlots(true);
      // Simulate loading time slots
      setTimeout(() => {
        setIsLoadingSlots(false);
      }, 500);
    }
  };
  
  // Get available time slots based on selected date
  // In a real app, this would come from an API
  const getTimeSlots = () => {
    if (!selectedDate) return [];
    
    // Use different time slots based on day of week to simulate realistic availability
    const day = selectedDate.getDay(); // 0-6 (Sunday-Saturday)
    
    // For demo purposes: weekend has fewer slots
    if (day === 0 || day === 6) {
      return TIME_SLOTS.slice(16, 22);
    }
    
    return TIME_SLOTS.slice(14, 26);
  };

  return (
    <div className="animate-fade-in">
      <StepIndicator 
        currentStep={1} 
        totalSteps={3} 
        stepLabels={["Date & Time", "Your Details", "Questions"]} 
      />
      
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-6">
          <Card className="overflow-hidden shadow-md border-gray-200/80">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <CalendarDays className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-medium">Select a date</h3>
              </div>
              
              {selectedDate && (
                <Badge variant="outline" className="bg-white">
                  {format(selectedDate, 'EEEE')}
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                className="rounded-md border shadow mx-auto"
                initialFocus
                disabled={(date) => {
                  // Disable dates in the past
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-6">
          <Card className="shadow-md border-gray-200/80 h-full">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 p-4 flex items-center">
              <Clock className="h-5 w-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium">
                {selectedDate 
                  ? `Available on ${format(selectedDate, 'MMM d, yyyy')}`
                  : 'Select a date to see available times'}
              </h3>
            </div>
            <CardContent className="p-4 pt-6">
              <TimeSlotGrid 
                timeSlots={getTimeSlots()}
                selectedTime={selectedTime}
                onTimeSelect={setSelectedTime}
                isLoading={isLoadingSlots}
              />
            </CardContent>
          </Card>

          {/* Summary card - shows on step 1 */}
          {selectedTime && (
            <BookingSummary 
              date={selectedDate}
              time={selectedTime}
              providerName={serviceData.providerName}
              duration={serviceData.duration}
            />
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <NavigationFooter
          currentStep={1}
          totalSteps={3}
          onPrevious={() => {}}
          onNext={onNext}
          showBackButton={false}
        />
      </div>
    </div>
  );
};

export default DateTimeStep;
