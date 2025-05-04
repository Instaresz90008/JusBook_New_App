
import BookingConfirmationCard from "@/components/booking/BookingConfirmationCard";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Plus, Share, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface ConfirmationStepProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  serviceData: {
    name: string;
    providerName: string;
    duration: string;
    additionalInfo: string;
  };
}

const ConfirmationStep = ({
  selectedDate,
  selectedTime,
  serviceData
}: ConfirmationStepProps) => {
  const navigate = useNavigate();
  
  // Mock functions - in a real app these would perform actual actions
  const addToCalendar = () => {
    alert("Calendar invite would be downloaded here");
  };
  
  const createAccount = () => {
    navigate("/");
  };

  return (
    <div className="max-w-xl mx-auto text-center animate-fade-in py-4">
      <div className="mb-8">
        <div className="h-20 w-20 mx-auto bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 ring-8 ring-green-50">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-2">You're all set!</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          You've successfully booked a {serviceData.name} with {serviceData.providerName}
        </p>
      </div>

      <BookingConfirmationCard
        date={selectedDate}
        time={selectedTime}
        duration={serviceData.duration}
        additionalInfo={serviceData.additionalInfo}
      />

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Button 
          variant="outline" 
          onClick={addToCalendar}
          className="flex items-center justify-center gap-2 h-auto py-4 border-blue-200 hover:border-blue-300 hover:bg-blue-50/50"
        >
          <Calendar className="h-5 w-5 text-blue-600" />
          <div className="text-left">
            <span className="font-medium block">Add to calendar</span>
            <span className="text-xs text-gray-500">Save this event to your calendar</span>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => {}}
          className="flex items-center justify-center gap-2 h-auto py-4 border-blue-200 hover:border-blue-300 hover:bg-blue-50/50"
        >
          <Share className="h-5 w-5 text-blue-600" />
          <div className="text-left">
            <span className="font-medium block">Share invitation</span>
            <span className="text-xs text-gray-500">Send to others who should attend</span>
          </div>
        </Button>
      </div>

      <Card className="p-6 bg-blue-50/50 border-blue-100 mb-8">
        <div className="flex flex-col items-center">
          <Star className="h-10 w-10 text-blue-500 mb-4" />
          <h3 className="text-lg font-medium mb-2">Create your account for a better experience</h3>
          <p className="text-gray-600 mb-4 max-w-md">
            Manage your bookings, get reminders, and access exclusive features
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md">
            <Button variant="outline" className="border-gray-300">
              Skip for now
            </Button>
            <Button 
              onClick={createAccount}
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" /> Create account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ConfirmationStep;
