
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import BookingLayout from "@/components/booking/BookingLayout";
import DateTimeStep from "@/components/booking/steps/DateTimeStep";
import UserDetailsStep from "@/components/booking/steps/UserDetailsStep";
import QuestionsStep from "@/components/booking/steps/QuestionsStep";
import ConfirmationStep from "@/components/booking/steps/ConfirmationStep";
import { format } from "date-fns";

// Mock timezone data
const timezones = [
  "America/Los_Angeles",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland"
];

// Mock country codes for phone numbers
const countryCodes = [
  { code: "+1", country: "US" },
  { code: "+44", country: "UK" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+91", country: "IN" },
  { code: "+61", country: "AU" },
  { code: "+81", country: "JP" },
  { code: "+86", country: "CN" },
  { code: "+65", country: "SG" },
  { code: "+971", country: "AE" }
];

const BookingPage = () => {
  const { bookingLink } = useParams();
  const { toast } = useToast();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [timezone, setTimezone] = useState(() => {
    try {
      // Try to get user's timezone
      const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return timezones.includes(userTimezone) ? userTimezone : "America/Los_Angeles";
    } catch (e) {
      return "America/Los_Angeles";
    }
  });
  
  // Character limits
  const NAME_CHAR_LIMIT = 100;
  const PURPOSE_CHAR_LIMIT = 30;
  
  // Mock service data (in a real app, you would fetch this based on bookingLink)
  const serviceData = {
    name: "Consultation",
    subtitle: "Sales Call",
    providerName: "Naveen K",
    duration: "45 mins",
    additionalInfo: "Web conferencing details provided upon confirmation"
  };

  // Update document title with service info
  useEffect(() => {
    document.title = `Book ${serviceData.name} with ${serviceData.providerName} | Event Hub`;
    
    return () => {
      document.title = "Event Hub";
    };
  }, []);

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedTime) {
      toast({
        title: "Please select a time",
        description: "You need to select a time slot to continue",
        variant: "destructive"
      });
      return;
    }
    
    if (currentStep === 2) {
      // Validate form fields
      if (!name || !email) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Scroll to top when changing steps
    window.scrollTo(0, 0);
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      // Scroll to top when changing steps
      window.scrollTo(0, 0);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitBooking = () => {
    // In a real app, you would submit the booking data to your backend
    toast({
      title: "Booking Confirmed!",
      description: `Your ${serviceData.name} has been scheduled for ${format(selectedDate!, 'MMM dd, yyyy')} at ${selectedTime}`,
    });
    
    // Show final confirmation screen
    window.scrollTo(0, 0);
    setCurrentStep(4);
  };

  // Get the title for the current step
  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Select Date and Time';
      case 2:
        return 'Enter Your Details';
      case 3:
        return 'Additional Information';
      case 4:
        return 'Booking Confirmed';
      default:
        return '';
    }
  };

  return (
    <BookingLayout
      title={getStepTitle()}
      timezones={timezones}
      timezone={timezone}
      setTimezone={setTimezone}
      serviceProviderName={serviceData.providerName}
      serviceName={serviceData.name}
      serviceSubtitle={serviceData.subtitle}
      currentStep={currentStep}
      serviceData={serviceData}
    >
      {/* Step 1: Date & Time selection */}
      {currentStep === 1 && (
        <DateTimeStep 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          serviceData={serviceData}
          onNext={handleNextStep}
        />
      )}

      {/* Step 2: User details */}
      {currentStep === 2 && (
        <UserDetailsStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          serviceData={serviceData}
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
          nameCharLimit={NAME_CHAR_LIMIT}
          purposeCharLimit={PURPOSE_CHAR_LIMIT}
          timezones={timezones}
          countryCodes={countryCodes}
          onPrevious={handlePreviousStep}
          onNext={handleNextStep}
        />
      )}

      {/* Step 3: Additional Questions */}
      {currentStep === 3 && (
        <QuestionsStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          serviceData={serviceData}
          name={name}
          email={email}
          onPrevious={handlePreviousStep}
          onNext={handleSubmitBooking}
        />
      )}

      {/* Step 4: Confirmation */}
      {currentStep === 4 && (
        <ConfirmationStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          serviceData={serviceData}
        />
      )}
    </BookingLayout>
  );
};

export default BookingPage;
