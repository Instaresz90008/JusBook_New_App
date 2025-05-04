
import StepIndicator from "@/components/booking/StepIndicator";
import BookingSummary from "@/components/booking/BookingSummary";
import NavigationFooter from "@/components/booking/NavigationFooter";
import BookingDetailsForm from "@/components/booking/BookingDetailsForm";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface UserDetailsStepProps {
  selectedDate: Date | undefined;
  selectedTime: string | null;
  serviceData: {
    providerName: string;
    duration: string;
  };
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  purpose: string;
  setPurpose: (purpose: string) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  countryCode: string;
  setCountryCode: (countryCode: string) => void;
  timezone: string;
  setTimezone: (timezone: string) => void;
  nameCharLimit: number;
  purposeCharLimit: number;
  timezones: string[];
  countryCodes: { code: string; country: string }[];
  onPrevious: () => void;
  onNext: () => void;
}

const UserDetailsStep = ({
  selectedDate,
  selectedTime,
  serviceData,
  name,
  setName,
  email,
  setEmail,
  purpose,
  setPurpose,
  phoneNumber,
  setPhoneNumber,
  countryCode,
  setCountryCode,
  timezone,
  setTimezone,
  nameCharLimit,
  purposeCharLimit,
  timezones,
  countryCodes,
  onPrevious,
  onNext
}: UserDetailsStepProps) => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <StepIndicator 
        currentStep={2} 
        totalSteps={3} 
        stepLabels={["Select Date and Time", "Enter Your Details", "Additional Questions"]} 
      />
      
      <Card className="mb-6">
        <div className="bg-blue-50 p-4 flex items-center">
          <User className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium">Your Information</h3>
        </div>
        <CardContent className="p-6">
          <BookingDetailsForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            purpose={purpose}
            setPurpose={setPurpose}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            timezone={timezone}
            setTimezone={setTimezone}
            nameCharLimit={nameCharLimit}
            purposeCharLimit={purposeCharLimit}
            timezones={timezones}
            countryCodes={countryCodes}
          />
        </CardContent>
      </Card>

      <BookingSummary
        date={selectedDate}
        time={selectedTime}
        providerName={serviceData.providerName}
        duration={serviceData.duration}
        variant="card"
      />

      <NavigationFooter
        currentStep={2}
        totalSteps={3}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
};

export default UserDetailsStep;
