
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import BookingQuestions from "@/components/booking/BookingQuestions";
import StepIndicator from "@/components/booking/StepIndicator";
import BookingSummary from "@/components/booking/BookingSummary";
import NavigationFooter from "@/components/booking/NavigationFooter";

interface QuestionsStepProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  serviceData: {
    providerName: string;
    duration: string;
  };
  name: string;
  email: string;
  onPrevious: () => void;
  onNext: () => void;
}

const QuestionsStep = ({
  selectedDate,
  selectedTime,
  serviceData,
  name,
  email,
  onPrevious,
  onNext
}: QuestionsStepProps) => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <StepIndicator 
        currentStep={3} 
        totalSteps={3} 
        stepLabels={["Select Date and Time", "Enter Your Details", "Additional Questions"]} 
      />
      
      <Card className="mb-6">
        <div className="bg-blue-50 p-4 flex items-center">
          <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium">Additional Questions</h3>
        </div>
        <CardContent className="p-6">
          <BookingQuestions />
        </CardContent>
      </Card>
      
      <BookingSummary
        date={selectedDate}
        time={selectedTime}
        providerName={serviceData.providerName}
        duration={serviceData.duration}
        name={name}
        email={email}
        variant="card"
        compact={true}
      />
      
      <NavigationFooter
        currentStep={3}
        totalSteps={3}
        onPrevious={onPrevious}
        onNext={onNext}
        nextLabel="Submit Booking"
      />
    </div>
  );
};

export default QuestionsStep;
