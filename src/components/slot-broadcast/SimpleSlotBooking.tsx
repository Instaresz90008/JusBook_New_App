
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { serviceOptions } from "./constants";
import { DURATION_OPTIONS } from "./utils/timeUtils";
import ServiceSettings from "./slot-booking/ServiceSettings";
import { calculateSimpleSlotSummary } from "./utils/slotCalculations";
import TimeSettings from "./simple-booking/TimeSettings";
import SummaryDialog from "./simple-booking/SummaryDialog";
import SlotServicePanel from "./slot-creation/SlotServicePanel";

interface SimpleSlotBookingProps {
  showWeekSelection?: boolean;
}

const SimpleSlotBooking = ({ showWeekSelection = false }: SimpleSlotBookingProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [service, setService] = useState("N/A");
  const [duration, setDuration] = useState("15 mins");
  const [email, setEmail] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [startTime, setStartTime] = useState("09:00 AM");
  const [endTime, setEndTime] = useState("05:00 PM");
  const [serviceCost, setServiceCost] = useState(1.0);
  
  const handleSave = () => {
    const slotSummary = calculateSimpleSlotSummary(
      service,
      [],  // We're not managing selectedDates in this component anymore
      startTime,
      endTime,
      duration,
      serviceCost
    );
    
    toast({
      title: "Availability Set",
      description: "Your availability has been saved successfully.",
    });
    
    setShowDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {!showWeekSelection && (
          <ServiceSettings
            date={date}
            setDate={setDate}
            service={service}
            setService={setService}
            duration={duration}
            setDuration={setDuration}
            email={email}
            setEmail={setEmail}
            serviceOptions={serviceOptions}
            durations={DURATION_OPTIONS}
            hideEmail={true}
          />
        )}
        
        {showWeekSelection && (
          <div className="space-y-6">
            {/* Service and time settings panel only */}
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4">Service & Time Settings</h3>
              <SlotServicePanel
                service={service}
                setService={setService}
                serviceCost={serviceCost}
                setServiceCost={setServiceCost}
                startTime={startTime}
                setStartTime={setStartTime}
                endTime={endTime}
                setEndTime={setEndTime}
                duration={duration}
                setDuration={setDuration}
              />
            </div>
          </div>
        )}
        
        {!showWeekSelection && (
          <div className="flex justify-end pt-2">
            <Button 
              onClick={handleSave}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Availability
            </Button>
          </div>
        )}
      </div>
      
      {/* Summary Dialog */}
      <SummaryDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        service={service}
        date={!showWeekSelection ? date : undefined}
        selectedDates={showWeekSelection ? [] : undefined}
        startTime={startTime}
        endTime={endTime}
        duration={duration}
        showWeekSelection={showWeekSelection}
      />
    </div>
  );
};

export default SimpleSlotBooking;
